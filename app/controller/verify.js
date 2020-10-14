/*
 * @Author: your name
 * @Date: 2020-07-08 11:34:30
 * @LastEditTime: 2020-07-10 10:25:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \music\app\controller\verify.js
 */

const egg = require('egg')

class verifyController extends egg.Controller {
  async captcha() {
    let { ctx } = this,
      { data, text } = await this.service.tools.captcha()
    ctx.set('Content-Type', 'image/svg+xml')
    ctx.session.MathCode = text
    ctx.body = data
  }
  async active() {
    let { ctx } = this,
      { s } = ctx.query,
      { email } = ctx.params
    ctx.body = (await ctx.service.tools.active(s, {
      email: new Buffer(email, 'base64').toString(),
      method: 'GET',
      fn: 'active'
    }))
      ? '激活成功'
      : '激活失败或已激活'
  }
}

module.exports = verifyController
