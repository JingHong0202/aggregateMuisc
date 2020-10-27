/*
 * @Author: your name
 * @Date: 2020-07-06 14:37:04
 * @LastEditTime: 2020-10-23 10:19:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\service\admin.js
 */

const egg = require('egg'),
  crypto = require('crypto')

class adminService extends egg.Service {
  async login(u, p) {
    let { ctx } = this
    // 数据库比较步骤
    let isUser = await this.app.mysql.select('users', {
      where: { username: u },
      columns: ['username', 'secret']
    })
    if (isUser.length) {
      let hamc = crypto.createHmac('sha256', isUser[0].secret)
      p = hamc.update(p).digest('hex')
      let isPass = await this.app.mysql.select('users', {
        where: { username: u, password: p }
      })
      if (isPass.length) {
        if (!+isPass[0].state)
          ctx.helper.ReturnErrorCode(403, '账号未激活或被封禁,请先去注册邮箱激活账号')
        // 获取用户秘钥
        let secret = isUser[0].secret
        await this.app.mysql.query(
          'UPDATE `users` SET `lastTime` = CURRENT_TIMESTAMP() WHERE username = "' +
            isUser[0].username +
            '"'
        )
        //签名
        return {
          sign: this.app.jwt.sign(
            {
              username: u,
              password: p
            },
            secret,
            { expiresIn: '24h' }
          ),
          state: isPass[0].state,
          role: isPass[0].role
        }
      } else {
        ctx.helper.ReturnErrorCode(403, '账号密码不正确')
      }
    } else {
      ctx.helper.ReturnErrorCode(403, '此账号不存在')
    }
  }
  async registry(u, p, email) {
    let { ctx, app } = this,
      secret
    secret = await this.service.tools.randomSecret()
    let hamc = crypto.createHmac('sha256', secret)
    p = hamc.update(p).digest('hex')
    let conn = await app.mysql.beginTransaction()
    try {
      await conn.insert('users', {
        username: u,
        password: p,
        email: email,
        secret
      })
      let domain =
        app.config.domain +
        '/userActive/' +
        new Buffer(email).toString('base64') +
        '?s=' +
        crypto
          .createHash('md5')
          .update(email + 'GET' + 'active')
          .digest('hex')
      let send = await ctx.service.tools.sendMail(
        email,
        `<a href=${domain} >${domain}</a>`,
        'aggregate-music账号激活'
      )
      if (send.response === '250 OK: queued as.') {
        await conn.commit()
      } else {
        throw new Error()
      }
    } catch (error) {
      await conn.rollback()
      let msg = /(username)/gi.test(error.message)
        ? '用户名重复'
        : /email/gi.test(error.message)
        ? '邮箱重复'
        : '未知错误,注册失败'
      ctx.helper.ReturnErrorCode(error.code === 'ER_DUP_ENTRY' ? 403 : 500, msg)
    }
    return conn
      ? { state: true, msg: '注册成功,请到邮箱激活,如没有请到垃圾邮箱查找' }
      : { state: false, msg: '注册失败' }
  }
}

module.exports = adminService
