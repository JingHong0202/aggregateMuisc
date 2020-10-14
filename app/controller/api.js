const egg = require('egg')

module.exports = class apiController extends egg.Controller {
  async run() {
    let { ctx, service } = this,
      platform = service[ctx.params[0]]
    if (!platform) ctx.helper.ReturnErrorCode(400)
    ctx.body = await platform.index()
  }
}
