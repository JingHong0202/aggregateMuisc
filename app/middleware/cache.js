/*
 * @Author: your name
 * @Date: 2020-07-04 21:31:33
 * @LastEditTime: 2020-09-17 17:15:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\middleware\cache.js
 */

module.exports = option => {
  return async function cache(ctx, next) {
    let platform = ctx.params[0]
    switch (platform) {
      case 'netease':
        var { mode, a, p, n } = ctx.query,
          str = `${platform}-${mode}-${a}${p ? `-${p}` : ''}${n ? `-${n}` : ''}`
        if (await ctx.app.cache.has(str)) {
          if (mode === 'search') {
            await ctx.service.tools.Direct(a)
          }
          return (ctx.body = await ctx.app.cache.get(str))
        }
        break

      // case 'tencent':
      //   var { mode, a, p, n, zhida } = ctx.query,
      //     str = `${platform}-${mode}-${a}${p ? `-${p}` : ''}${n ? `-${n}` : ''}${
      //       zhida ? `-${zhida}` : ''
      //     }`
      //   if (await ctx.app.cache.has(str)) {
      //     // console.log('success')
      //     return (ctx.body = await ctx.app.cache.get(str))
      //   }
      //   break
    }
    await next()
  }
}
