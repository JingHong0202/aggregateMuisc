/*
 * @Author: your name
 * @Date: 2020-07-17 23:01:57
 * @LastEditTime: 2020-08-03 09:18:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\controller\play.js
 */
const egg = require('egg')

module.exports = class playController extends egg.Controller {
  async run() {
    let { ctx } = this,
      platform = this[ctx.params.platform]
    if (!platform) ctx.helper.ReturnErrorCode(404)
    await platform(ctx)
  }
  async playlist(ctx) {
    let { a } = ctx.query
    if (!ctx.service.playlist[a]) ctx.helper.ReturnErrorCode(404)
    let res = await ctx.service.playlist[a]()
    if (res) ctx.helper.ReturnCustomCode(200, '', res)
  }
  async player(ctx) {
    let { a } = ctx.query
    if (!ctx.service.player[a]) ctx.helper.ReturnErrorCode(404)
    let res = await ctx.service.player[a]()
    if (res) ctx.helper.ReturnCustomCode(200, '', res)
  }
  async playfind(ctx) {
    let { a } = ctx.query
    if (a !== 'find') ctx.helper.ReturnErrorCode(404)
    await ctx.service.common.playFind()
  }
  async playrank(ctx) {
    await ctx.service.common.playRank()
  }
}
