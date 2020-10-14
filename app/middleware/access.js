/*
 * @Author: your name
 * @Date: 2020-07-06 14:00:55
 * @LastEditTime: 2020-10-09 11:10:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\middleware\access.js
 */
module.exports = option => {
  return async function Verify(ctx, next) {
    try {
      let ClientUsername = ctx.cookies.get('d2admin-1.14.0-uuid', {
        signed: false
      })
      let authorization = ctx.headers.authorization.replace(/^Bearer\s*/g, '')
      let verifyUser = await ctx.service.tools.verifyUser(authorization, ClientUsername, 'token')
      if (!verifyUser) {
        throw Error('Token无效')
      }
      let verifyState = await ctx.service.tools.verifyUser(authorization, ClientUsername, 'state')
      if (!verifyState) {
        throw Error('该用户被封禁')
      }
      await next()
    } catch (error) {
      return ctx.helper.ReturnErrorCode(401)
    }
  }
}