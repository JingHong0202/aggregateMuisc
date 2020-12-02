/*
 * @Author: your name
 * @Date: 2020-11-25 12:16:12
 * @LastEditTime: 2020-12-01 10:34:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\lib\verify-domain.js
 */
module.exports = {
  async verifyDomain(ctx,mode) {
    let { uuid } = ctx.request.headers
    if (mode === 'url' || mode === 'parseRankList' || mode === "lyric"  || mode === 'playlist') {
      if (!uuid) ctx.helper.ReturnErrorCode(401)
      if (!(await ctx.service.tools.verifyDomain(uuid)))
        ctx.helper.ReturnErrorCode(403, '域名认证失败，请先绑定域名')
    }
    
  }
}
