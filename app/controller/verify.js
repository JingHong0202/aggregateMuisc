/*
 * @Author: your name
 * @Date: 2020-07-08 11:34:30
 * @LastEditTime: 2020-10-16 11:10:30
 * @LastEditors: Please set LastEditors
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
  async verify_ForgetPassword() {
    try {
      this.ctx.validate({
        username: {
          type: 'string',
          min: 6,
          max: 12
        },
        code: 'number'
      })
    } catch (error) {
      this.ctx.helper.ReturnErrorCode(400)
    }
    if (!this.ctx.service.tools.verifyCaptcha(this.ctx.request.body.code)) {
      this.ctx.helper.ReturnErrorCode(403, '验证码错误')
    }
    await this.ctx.service.tools.forGet()
  }
}

module.exports = verifyController
