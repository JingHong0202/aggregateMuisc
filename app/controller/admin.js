/*
 * @Author: your name
 * @Date: 2020-07-06 14:00:45
 * @LastEditTime: 2020-10-14 15:14:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\controller\admin.js
 */

const egg = require('egg')

class adminController extends egg.Controller {
  async login() {
    let { ctx } = this
    try {
      ctx.validate({
        username: {
          type: 'string',
          min: 6,
          max: 12
        },
        password: 'password',
        code: 'number'
      })
    } catch (error) {
      ctx.helper.ReturnErrorCode(403, '账户或密码格式错误')
    }
    if (!ctx.service.tools.verifyCaptcha(ctx.request.body.code)) {
      ctx.helper.ReturnErrorCode(403, '验证码错误')
    }
    let { username, password } = ctx.request.body,
      { sign, state, role } = await ctx.service.admin.login(username, password)
    if (sign) {
      ctx.session.sign = sign
      ctx.helper.ReturnSuccessCode(200, '登录成功', { sign, username, state, role })
    } else {
      ctx.helper.ReturnErrorCode(403, '账户密码错误,请重试')
    }
  }
  async registry() {
    let { ctx } = this
    try {
      ctx.validate({
        username: {
          type: 'string',
          min: 6,
          max: 12
        },
        password: 'password',
        email: 'email',
        repassword: {
          type: 'repassword',
          password: ctx.request.body.password
        },
        code: {
          type: 'number'
        }
      })
    } catch (error) {
      if (error.errors[0].field === 'repassword') {
        ctx.helper.ReturnErrorCode(403, error.errors[0].message)
      }
      ctx.helper.ReturnErrorCode(403, '账户或密码格式错误')
    }
    let { username, password, code, email } = ctx.request.body
    if (!ctx.service.tools.verifyCaptcha(code)) {
      ctx.helper.ReturnErrorCode(403, '验证码错误')
    }
    let res = await ctx.service.admin.registry(username, password, email)
    if (res.state) {
      ctx.helper.ReturnSuccessCode(200, res.msg)
    } else {
      ctx.helper.ReturnErrorCode(403, res.msg)
    }
  }
  async user() {
    let { ctx } = this,
      { a } = ctx.query
    if (ctx.service.user[a]) {
      let res = await ctx.service.user[a]()
      if (res) {
        ctx.body = res
      }
    } else {
      ctx.helper.ReturnErrorCode(404)
    }
  }
  async role() {
    let { ctx } = this,
      { a } = ctx.query
    if (ctx.service.role[a]) {
      let res = await ctx.service.role[a]()
      if (res) ctx.body = res
    } else {
      ctx.helper.ReturnErrorCode(404)
    }
  }
  async dashboard() {
    let { ctx } = this
    ctx.body = await ctx.service.tools.ReadDashboard()
  }
  async words() {
    let { ctx } = this
    ctx.body = await ctx.service.tools.ReadWords()
  }
  async logs() {
    let { ctx } = this,
      { a } = ctx.query
    if (a) {
      await ctx.service.tools[a]()
    } else {
      ctx.body = await ctx.service.tools.getlogs()
    }
  }
  async run() {
    this.ctx.unsafeRedirect('/index.html')
  }
}

module.exports = adminController
