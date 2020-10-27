/*
 * @Author: your name
 * @Date: 2020-07-01 09:51:34
 * @LastEditTime: 2020-10-13 16:12:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\extend\helper.js
 */

module.exports = {
  ReturnErrorCode(n, m) {
    let { ctx } = this
    ctx.status = n
    switch (n) {
      case 400:
        ctx.throw('Bad Request', n)
        break
      case 401:
        ctx.throw('Unauthorized', n)
        break
      case 403:
        ctx.throw(m, n)
        break
      case 404:
        ctx.throw('Not Found', n)
        break
      default:
        ctx.throw('ServerError', 500)
    }
  },
  ReturnCustomCode(n, m, data = {}) {
    let { ctx } = this
    ctx.status = n
    return (ctx.body = {
      msg: m,
      data: data
    })
  }
}
