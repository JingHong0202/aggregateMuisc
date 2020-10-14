/*
 * @Author: your name
 * @Date: 2020-07-03 19:44:21
 * @LastEditTime: 2020-10-13 13:23:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\service\netease.js
 */

const egg = require('egg'),
  netease = require('simple-netease-cloud-music'),
  nm = new netease()

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

    let { uuid } = ctx.request.headers
    if (!uuid) ctx.helper.ReturnErrorCode(401)
    if (!(await ctx.service.tools.verifyDomain(uuid)))
      ctx.helper.ReturnErrorCode(403, '域名认证失败，请先绑定域名')

    if (nm[mode]) {
      if (mode === 'picture') {
        res = await nm[mode](a, ctx.query.px || 500)
      } else if (mode === 'search') {
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
      } else if (mode === 'playlist') {
        let result = await nm[mode](a)
        try {
          let {
            playlist: { tracks }
          } = result
          res = await this._parse(await Promise.all(await this._normlize(tracks)))
          res = typeof res === 'object' ? Object.keys(res).map(item => res[item]) : res
        } catch (error) {
          ctx.status = 500
          res = { msg: '歌单获取失败' }
        }
      } else if (mode === 'artist') {
        res = await nm[mode](a, n || 60)
      } else {
        let params
        try {
          params = JSON.parse(a)
        } catch (err) {
          params = a
        }
        res = await nm[mode](params)
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
    let { ctx, app } = this
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
        playlist: { tracks }
      } = res
      res = await this._parse(this._normlize(tracks))
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
}

module.exports = neteaseService
