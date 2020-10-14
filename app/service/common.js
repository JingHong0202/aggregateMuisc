/*
 * @Author: your name
 * @Date: 2020-07-19 11:02:38
 * @LastEditTime: 2020-08-03 18:37:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\service\common.js
 */
const egg = require('egg')

module.exports = class commonService extends egg.Service {
  async playFind() {
    let { ctx } = this
    let playlist = await ctx.service.playlist.find(),
      player = await ctx.service.player.find()
    ctx.helper.ReturnSuccessCode(200, '', { playlist, player })
  }
  async playRank() {
    let { ctx } = this
    let netease = await ctx.service.netease.ranklist(),
      tencent = await ctx.service.tencent.ranklist()
    netease = netease.status === 200 ? netease.data.list : 'netease 排行歌单获取失败'
    tencent = !tencent.code ? tencent.data.topList : 'tencent 排行歌单获取失败'
    netease = netease.length
      ? netease.map(item => {
          return {
            uuid: item.id,
            name: item.name,
            pic: item.coverImgUrl,
            platform: 'netease',
            desc: item.description
          }
        })
      : netease
    tencent = tencent.length
      ? tencent.map(item => {
          return {
            uuid: item.id,
            name: item.topTitle,
            pic: item.picUrl,
            platform: 'tencent',
            desc: item.topTitle
          }
        })
      : tencent
    ctx.helper.ReturnSuccessCode(200, '', { netease, tencent })
  }
}
