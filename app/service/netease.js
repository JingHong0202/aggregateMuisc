/*
 * @Author: your name
 * @Date: 2020-07-03 19:44:21
 * @LastEditTime: 2020-12-01 09:50:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\service\netease.js
 */

const egg = require('egg'),
  netease = require('./other-api/netease'),
  nm = new netease(),
  { verifyDomain } = require('../lib/verify-domain')

class neteaseService extends egg.Service {
  /*
    search
    album
    artist
    song
    url
    picture
    playlist
    lyric
  */
  async index() {
    let { ctx } = this,
      { a, mode, p, n } = ctx.method === 'GET' ? ctx.query : ctx.request.body,
      res
    if (!a) ctx.helper.ReturnErrorCode(400)
    await verifyDomain(ctx, mode)
    if (nm[mode]) {
      switch (mode) {
        case 'picture':
          res = await nm[mode](a, ctx.query.px || 500)

          break
        case 'search':
          try {
            await ctx.service.tools.Direct(a)
            let {
              result: { songs }
            } = await nm[mode](a, p || 1, n || 20)
            res = await this._parse(await Promise.all(await this._normlize(songs)))
            res = typeof res === 'object' ? Object.keys(res).map(item => res[item]) : res
          } catch (error) {
            ctx.status = 500
            res = { msg: '搜索失败' }
          }

          break
        case 'playlist':
          let result = await nm[mode](a)
          try {
            let {
              playlist: { trackIds }
            } = result
            res = await this._parse(await Promise.all(await this._normlize_trackIds(trackIds)))
            res = typeof res === 'object' ? Object.keys(res).map(item => res[item]) : res
          } catch (error) {
            ctx.status = 500
            res = { msg: '歌单获取失败' }
          }

          break
        case 'artist':
          res = await nm[mode](a, n || 60)

          break
        default:
          let params
          try {
            params = JSON.parse(a)
          } catch (err) {
            params = a
          }
          res = await nm[mode](params)

          break
      }
    } else if (this[mode]) {
      res = (await this[mode](a)).data
    } else {
      ctx.helper.ReturnErrorCode(404)
    }
    res.code === 200 || res.length
      ? await this.app.cache.set(
          `${ctx.params[0]}-${mode}-${a}${p ? `-${p}` : ''}${n ? `-${n}` : ''}`,
          res,
          1600
        )
      : ''
    return res
  }

  // async lyric() {
  //   let { ctx } = this,
  //     { a } = ctx.query
  //   if (!a) ctx.helper.ReturnErrorCode(400)

  //   let res = await nm.lyric(a)

  //   return res.tlyric || lyric.lrc || res
  // }

  async ranklist() {
    let { ctx } = this
    // if (await app.cache.has(`netease-rank`)) {
    //   return await app.cache.get(`netease-rank`)
    // }
    let res = await ctx.curl('https://music.163.com/api/toplist', { dataType: 'json' })
    // await app.cache.set(`netease-rank`, res, 16000)
    return res
  }
  async parseRankList() {
    let { ctx } = this,
      { a } = ctx.query
    if (!a) ctx.helper.ReturnErrorCode(400)
    let res = await nm.playlist(a)
    try {
      let {
        playlist: { trackIds }
      } = res
      res = await this._parse(await this._normlize_trackIds(trackIds))
      res = typeof res === 'object' ? Object.keys(res).map(item => res[item]) : res
    } catch (error) {
      ctx.status = 500
      res = { msg: '歌单获取失败' }
    }
    return { data: res }
  }
  // async parseOne (id) {
  //   let { ctx } = this,
  //     { a } = ctx.query
  //   if (!a) ctx.helper.ReturnErrorCode(400)
  //   return
  // }
  async _parse(list) {
    let ids = list.map(item => item.id).join(',')
    let urls = await nm.url(`${ids}`)
    urls.data.forEach((item, i) => {
      list.find(item2 => item2.id === item.id).url = item.url || false
    })
    return { ...list }
  }
  _normlize(list) {
    return list.map(item => {
      // let lyric = await nm.lyric(item.id)
      return {
        id: item.id,
        singer: item.ar.map(item => item.name).join('/'),
        name: item.name,
        // lyric: lyric.tlyric || lyric.lrc || lyric,
        image: item.al.picUrl + '?param=250y250',
        duration: item.dt || 0,
        // spareUrl: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
        platform: 'netease'
      }
    })
  }
  async _normlize_trackIds(list) {
    let ids = await nm.song(list.map(item => '{"id": ' + item.id + '}').join(','))

    return ids.songs.map(item => {
      // let lyric = await nm.lyric(item.id)
      return {
        id: item.id,
        singer: item.ar.map(item => item.name).join('/'),
        name: item.name,
        // lyric: lyric.tlyric || lyric.lrc || lyric,
        image: item.al.picUrl + '?param=250y250',
        duration: item.dt || 0,
        // spareUrl: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
        platform: 'netease'
      }
    })
  }
}

module.exports = neteaseService
