/*
 * @Author: your name
 * @Date: 2020-07-12 21:30:25
 * @LastEditTime: 2020-10-21 15:29:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\service\user.js
 */

const egg = require('egg'),
  crypto = require('crypto')

class userService extends egg.Service {
  async list() {
    let { app, ctx } = this,
      { page, wd, num } = ctx.query
    let like = wd ? ` WHERE username LIKE '%${wd}%' || email LIKE '%${wd}%' ` : '',
      sql = `SELECT username,state,email,lastTime,role FROM users ${like} LIMIT ${!page ? 0 : page * +num || 5
        },${+num || 5}`
    let res = await app.mysql.query(sql)
    // let res = await app.mysql.select('users', {
    //   columns: ['username', 'state', 'email', 'lastTime', 'role'],
    //   limit: +num || 5,
    //   offset: !page ? 0 : page * +num || 5
    // })
    let count = (await this.count(like))[0].count
    let sumRole = (await this.sumRole())[0]

    return {
      count,
      sumRole,
      data: res
    }
  }
  async add() {
    let { ctx } = this
    try {
      ctx.validate({
        username: {
          type: 'string',
          min: 6,
          max: 12
        },
        email: 'email',
        password: 'password',
        state: 'string',
        role: 'string'
      })
    } catch (error) {
      ctx.helper.ReturnErrorCode(400)
    }
    let { username, password, email } = ctx.request.body
    let res = await ctx.service.admin.registry(username, password, email)
    if (res.state) {
      ctx.helper.ReturnCustomCode(200, res.msg)
    } else {
      ctx.helper.ReturnErrorCode(403, res.msg)
    }
  }
  async update() {
    let { app, ctx } = this
    try {
      ctx.validate(
        {
          username: {
            max: 12,
            min: 6,
            type: 'string'
          }
        },
        ctx.query
      )
    } catch (error) {
      ctx.helper.ReturnErrorCode(400)
    }
    let res = await app.mysql.update(
      'users',
      {
        ...ctx.request.body,
        state: ctx.request.body.state ? '1' : '0'
      },
      {
        where: {
          username: ctx.query.username
        }
      }
    )
    return res.affectedRows === 1
      ? ctx.helper.ReturnCustomCode(200, '修改成功')
      : ctx.helper.ReturnErrorCode(403, '修改失败,请检查参数')
  }
  async delete() {
    let { app, ctx } = this

    try {
      ctx.validate({
        username: {
          type: 'string',
          min: 6,
          max: 12
        },
        email: 'email'
      })
    } catch (error) {
      ctx.helper.ReturnErrorCode(400)
    }
    let { username, email } = ctx.request.body
    let res = await app.mysql.delete('users', {
      username,
      email
    })
    return res.affectedRows === 1
      ? ctx.helper.ReturnCustomCode(200, '删除成功')
      : ctx.helper.ReturnErrorCode(403, '删除失败')
  }

  async count(like) {
    let { app } = this
    return await app.mysql.query('SELECT count(*) as count FROM users ' + like)
  }
  async sumRole() {
    let { app } = this
    let roles = await app.mysql.select('role')
    roles = roles.map(item => {
      return `sum(case when role='${item.rolename}' then 1 end) as ${item.rolename} `
    })
    let sql = `SELECT ${roles} from users`
    return await app.mysql.query(sql)
  }
  async updatePassword(username) {
    let { ctx, app } = this
    try {
      ctx.validate({
        password: 'password',
        repassword: {
          type: 'repassword',
          password: ctx.request.body.password
        },
        code: 'number'
      })
    } catch (error) {
      if (error.errors[0].field === 'repassword') {
        return (error.errors[0].message)
        // ctx.helper.ReturnErrorCode(403, error.errors[0].message)
      }
      return ('账户或密码格式错误')
    }
    if (!this.ctx.service.tools.verifyCaptcha(ctx.request.body.code)) {
      return ('验证码错误')
    }

    let secret = await ctx.service.tools.randomSecret()
    let hamc = crypto.createHmac('sha256', secret),
      p = hamc.update(ctx.request.body.password).digest('hex')
    try {
      await app.mysql.update(
        'users',
        {
          password: p,
          secret
        },
        { where: { username } }
      )
      return '密码修改成功'
    } catch (error) {
      return ('密码更改失败')
    }
  }
  async ForgetPassWord() {
    let { app, ctx } = this,
      email = new Buffer(ctx.params.email, 'base64').toString(),
      { s, captcha } = ctx.query
    if (!email) ctx.helper.ReturnErrorCode(400)
    let user = await app.mysql.get('users', { email }),
      clientS = ctx.service.tools.encry_ForgetPassowrd(JSON.stringify(user))
    if (!user) ctx.helper.ReturnErrorCode(400)
    let isError, isVerify
    app.jwt.verify(s || captcha, clientS, async (err, decoded) => {
      if (err) {
        ctx.logger.error(err)
        isError = true
      }

      if (decoded.username === user.username) {
        if (s) {
          isVerify = true
        }
        if (captcha) {
          ctx.helper.ReturnCustomCode(403, (await this.updatePassword(user.username)))
        }
      }
    })
    if (isError) {
      ctx.helper.ReturnErrorCode(403, '此链接已失效')
    }
    if (isVerify) {
      return ctx.unsafeRedirect(
        app.config.env === 'local'
          ? `${app.config.staticDomain}/#/login?captcha=${s}&email=${ctx.params.email}`
          : `${app.config.domain}/login?captcha=${s}&email=${ctx.params.email}`
      )
    }
    // ctx.helper.ReturnCustomCode(200, '修改密码成功')
  }
}

module.exports = userService
