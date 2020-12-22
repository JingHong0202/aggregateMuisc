/*
 * @Author: your name
 * @Date: 2020-11-25 12:16:12
 * @LastEditTime: 2020-12-22 22:36:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\lib\verify-domain.js
 */
module.exports = {
  async verifyDomain(ctx, mode) {
    let { uuid } = ctx.request.headers
    if (
      mode === 'url' ||
      mode === 'parseRankList' ||
      mode === 'lyric' ||
      mode === 'playlist' ||
      mode === 'search'
    ) {
      if (!uuid) {
        let ClientUserName = ctx.cookies.get('d2admin-1.14.0-uuid', {
            signed: false
          }),
          authorization = ctx.headers.authorization
        if (ClientUserName && authorization) {
          let verifyUser = await ctx.service.tools.verifyUser(
            authorization,
            ClientUserName,
            'token'
          )
          if (!verifyUser) {
            throw Error('Token无效')
          }
          let verifyState = await ctx.service.tools.verifyUser(
            authorization,
            ClientUserName,
            'state'
          )
          if (!verifyState) {
            throw Error('该用户被封禁')
          }
        } else {
          ctx.helper.ReturnErrorCode(401)
        }
      }
      if (!(await ctx.service.tools.verifyDomain(uuid)))
        ctx.helper.ReturnErrorCode(403, '域名认证失败，请先绑定域名')
    }
  }
}
