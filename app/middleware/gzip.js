/*
 * @Author: your name
 * @Date: 2020-10-22 13:58:50
 * @LastEditTime: 2020-10-22 22:15:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\middleware\gzip.js
 */
const zlib = require('zlib')

module.exports = option => {
  return async function gzip(ctx, next) {
    await next()

    if (option.threshold && option.threshold > ctx.length) return
    if (!ctx.body) return
    const stream = zlib.createGzip()
    stream.end(
      Object.prototype.toString.call(ctx.body) === '[object String]'
        ? ctx.body
        : JSON.stringify(ctx.body)
    )
    ctx.body = stream
    ctx.set('Content-Encoding', 'gzip')
  }
}
