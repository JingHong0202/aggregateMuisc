/*
 * @Author: your name
 * @Date: 2020-07-07 14:05:39
 * @LastEditTime: 2020-11-22 17:21:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\middleware\error.js
 */

module.exports = option => {
  return async function customError(ctx, next) {
    try {
      await next()
    } catch (error) {
      let resError = error.toString() || '未知错误'
      if (!ctx.status) ctx.status = 500
      ctx.logger.error(resError)
      ctx.body = {
        msg: resError
      }
    }
  }
}
