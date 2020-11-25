/*
 * @Author: your name
 * @Date: 2020-11-25 12:16:12
 * @LastEditTime: 2020-11-25 12:26:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\lib\verify-domain.js
 */
module.exports = {
  async verifyDomain(ctx) {
    let { uuid } = ctx.request.headers
    if (!uuid) ctx.helper.ReturnErrorCode(401)
    if (!(await ctx.service.tools.verifyDomain(uuid)))
      ctx.helper.ReturnErrorCode(403, '域名认证失败，请先绑定域名')
  }
}
