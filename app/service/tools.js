/*
 * @Author: your name
 * @Date: 2020-07-08 12:46:51
 * @LastEditTime: 2020-10-22 20:29:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\service\tools.js
 */

const egg = require('egg'),
  svgCaptcha = require('svg-captcha'),
  crypto = require('crypto'),
  path = require('path'),
  fs = require('fs')

class toolsService extends egg.Service {
  async captcha() {
    return svgCaptcha.createMathExpr({
      mathMin: 999,
      noise: 7,
      color: '#fff',
      background: '#299'
    })
  }
  verifyCaptcha(code) {
    let { ctx } = this
    return +code === +ctx.session.MathCode
  }
  async verifyUser(authorization, ClientUserName, method) {
    let success = false
    let { ctx, app } = this

    let user = (
      await app.mysql.select('users', {
        where: { username: ClientUserName }
      })
    )[0]
    switch (method) {
      case 'token':
        if (!authorization || !user.secret) return ctx.helper.ReturnErrorCode(401)
        ctx.app.jwt.verify(authorization, user.secret, (err, decoded) => {
          if (err) {
            app.logger.error(err)
          } else {
            if (decoded.username !== user.username) {
              app.logger.error('Invalid username')
              return success
            }
            if (decoded.password !== user.password) {
              app.logger.error('Invalid password')
              return success
            }
            success = true
          }
        })
        break
      case 'state':
        if (!user.state) {
          app.logger.error(`${ClientUserName}的用户状态属于封禁状态，不能进行任何操作`)
        } else {
          success = true
        }
        break
    }

    return success
  }
  async verifyPlay(username, method) {
    let { ctx, app } = this
    if (!username) ctx.helper.ReturnErrorCode(401)

    let user = await app.mysql.get('users', {
        username
      }),
      { role } = user

    if (!role) ctx.helper.ReturnErrorCode(401)
    let permissions = JSON.parse(
      (
        await app.mysql.get('role', {
          rolename: role
        })
      ).permissions
    )
    return permissions[method]
  }
  async verifyDomain(uuid) {
    let { ctx, app } = this
    let success = false,
      currentDomain = ctx.request.header['x-forwarded-host'],
      currentHostDomain = ctx.host
    if (ctx.request.headers['host'].indexOf(currentHostDomain) !== -1) {
      success = true
    } else {
      let domains = JSON.parse(
        (
          await app.mysql.get('player', {
            uuid
          })
        ).domains
      )

      domains.forEach(({ domainName }) => {
        if (domainName.indexOf(currentDomain) !== -1) {
          success = true
        }
      })
    }

    return success
  }
  async active(sign, option) {
    let { app } = this

    if (
      sign ===
      crypto
        .createHash('md5')
        .update(option.email + option.method + option.fn)
        .digest('hex')
    ) {
      let res = await app.mysql.update(
        'users',
        {
          state: 1
        },
        {
          where: { email: option.email }
        }
      )
      return res.changedRows === 1
    }
    return false
  }
  randomSecret() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(32, async (err, buf) => {
        if (err) throw err
        resolve(buf.toString('hex'))
      })
    })
  }
  randomUUid() {
    return (((1 + Math.random()) * 0x10000 + new Date().getTime()) | 10).toString(16)
  }
  async sendMail(to, html, str) {
    let { app } = this
    return await app.mailer.send({
      from: app.config.mailer.auth.user, // 发件人地址, [可选] 默认为用户名
      to, // 接收人名单
      subject: str, // 主题
      text: str,
      html // html body
    })
  }
  encry_ForgetPassowrd(str) {
    return crypto
      .createHash('md5')
      .update(new Buffer(str, 'base64').toString() + 'POST' + 'encryption')
      .digest('hex')
  }
  async forGet() {
    let { ctx, app } = this
    let user = await app.mysql.get('users', { username: ctx.request.body.username })
    if (!user) ctx.helper.ReturnErrorCode(403, '此邮箱没有绑定用户')
    let s = this.encry_ForgetPassowrd(JSON.stringify(user))
    let token = this.app.jwt.sign(
      {
        username: user.username
      },
      s,
      { expiresIn: '30min' }
    )
    try {
      await this.sendMail(
        user.email,
        `${app.config.domain}/ForgetPassWord/${new Buffer(user.email).toString(
          'base64'
        )}?s=${token}&a=ForgetPassWord`,
        '密码找回'
      )
      ctx.helper.ReturnCustomCode(200, '请到' + user.email + '邮箱查收')
    } catch (error) {
      ctx.helper.ReturnErrorCode(500)
    }
  }
  async ReadWords() {
    let file = path.join(__dirname, '../../data/words.json')
    if (!fs.existsSync(file)) {
      fs.promises.writeFile(file, JSON.stringify({}), { flag: 'a+' })
    }
    let data = await fs.promises.readFile(file),
      res

    try {
      res = JSON.parse(data)
    } catch (error) {
      res = {}
    }
    return res
  }
  async WriteWords(data) {
    let file = path.join(__dirname, '../../data/words.json')
    await fs.promises.writeFile(file, JSON.stringify(data))
  }
  async Direct(word) {
    let words = await this.ReadWords()
    if (words[word]) {
      words[word] += 1
    } else {
      words[word] = 1
    }
    await this.WriteWords(words)
  }
  async ReadDashboard() {
    let file = path.join(__dirname, '../../data/dashboard.json'),
      read = await fs.promises.readFile(file)
    return read
  }

  async WriteDashboard(data) {
    let file = path.join(__dirname, '../../data/dashboard.json')
    await fs.promises.writeFile(file, JSON.stringify(data))
  }
  async playListFile(uuid, name, option = {}) {
    let dirPath = path.join(__dirname, '../../data/playlist'),
      targetDir = path.join(dirPath, `/${name}`)
    if (!uuid || !name) new Error('歌单文件保存失败')
    if (!fs.existsSync(targetDir)) {
      await fs.promises.mkdir(targetDir, { recursive: true })
    }
    let file = path.join(targetDir, `/${uuid}.json`)
    if (!option.content) {
      let isfile = fs.existsSync(file)
      if (option.isDel) {
        return isfile ? await fs.promises.unlink(file) : null
      } else {
        return isfile ? (await fs.promises.readFile(file)).toString() : null
      }
    } else {
      await fs.promises.writeFile(file, option.content)
      return file
    }
  }
  async getlogs() {
    let logDir = path.join(__dirname, '../../logs/aggregate-music')
    let readDIr = await fs.promises.opendir(logDir)
    let res = []
    for await (let dirent of readDIr) {
      if (/\.json\.log(.*)$/.test(dirent.name)) {
        let content = await fs.promises.readFile(path.join(logDir, dirent.name), 'utf8'),
          name = dirent.name
        res.push({ content, name })
      }
    }
    return res
  }
  async deleteLogAll() {
    let { ctx } = this
    let logDir = path.join(__dirname, '../../logs/aggregate-music')
    let readDir = await fs.promises.opendir(logDir)
    for await (let dirent of readDir) {
      let result = await fs.promises.truncate(path.join(logDir, dirent.name), 0)
      if (result) return ctx.helper.ReturnErrorCode(500)
    }
    return ctx.helper.ReturnCustomCode(200, '日志清空成功')
  }

  async readPlayerJS() {
    let { ctx } = this
    let filePath = path.join(__dirname, '../public/js/player.js')
    let content = await fs.promises.readFile(filePath, 'utf8')
    ctx.set('Content-Type', 'application/javascript')
    return content
  }
}

module.exports = toolsService
