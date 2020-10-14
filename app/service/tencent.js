const egg = require('egg')

class tencentService extends egg.Service {
  _uid = ''
  tryTime = 0
  async index() {
    let { ctx } = this,
      { mode } = ctx.query,
      res
    if (!mode || !this[mode]) ctx.helper.ReturnErrorCode(404)
    res = await this[mode]()
    return res
  }
  async lyric(mid) {
    let { ctx } = this
    let { data } = await ctx.curl('https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg', {
      headers: {
        referer: 'https://c.y.qq.com',
        host: 'c.y.qq.com'
      },
      dataType: 'text',
      data: {
        songmid: mid,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        categoryId: 10000000,
        pcachetime: +new Date(),
        format: 'json',
        g_tk: 5381,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'jsonp'
      }
    })
    return this._formatJsonpData(data, 'MusicJsonCallback')
  }
  async url(req_0) {
    let { ctx } = this,
      { data } = await ctx.curl('https://u.y.qq.com/cgi-bin/musicu.fcg', {
        // data: {
        //   req_0: req_0
        // },
        content: JSON.stringify({ req_0 }),
        method: 'POST',
        headers: {
          referer: 'https://y.qq.com/',
          origin: 'https://y.qq.com',
          'Content-type': 'application/x-www-form-urlencoded',
          host: 'u.y.qq.com',
          'X-Real-IP': '157.255.173.172',
          'X-Forwarded-For': '157.255.173.172',
          HTTP_CLIENT_IP: '157.255.173.172',
          'Proxy-Client-IP': '157.255.173.172',
          'WL-Proxy-Client-IP': '157.255.173.172'
        },
        dataType: 'json'
      })
    return data
  }
  async playlist() {
    let { ctx } = this,
      { a } = ctx.query
    if (!a) ctx.helper.ReturnErrorCode(400)
    let res = await ctx.curl(
      'http://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1',
      {
        headers: {
          referer: 'https://y.qq.com/',
          origin: 'https://y.qq.com',
          host: 'c.y.qq.com',
          param: 'jsonpCallback',
          prefix: 'jp'
        },
        data: {
          disstid: a,
          json: 1,
          utf8: 1,
          onlysong: 0,
          platform: 'yqq',
          hostUid: 0,
          needNewCode: 0
        },
        dataType: 'text'
      }
    )
    if (res.status !== 200) ctx.helperReturnErrorCode(500)
    res = await this._parse(
      await Promise.all(
        this._normalizeSongs(this._formatJsonpData(res.data, 'jsonCallback').cdlist[0].songlist)
      )
    )
    await ctx.app.cache.set(`${ctx.params[0]}-${ctx.query.mode}-${a}`, res, 86400)
    return res
  }
  async ranklist() {
    let { ctx, app } = this
    if (await app.cache.has(`tencent-rank`)) {
      return await app.cache.get(`tencent-rank`)
    }
    let getRanks = await ctx.curl('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
      dataType: 'json',
      data: {
        platform: 'h5',
        needNewCode: 1,
        uin: 0,
        g_tk: 5381,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'json'
      }
    })

    // if (getRanks.status !== 200) ctx.helper.helperReturnErrorCode(500)
    await app.cache.set(`tencent-rank`, getRanks.data, 16000)
    return getRanks.data
  }
  async parseRankList() {
    let { ctx } = this,
      topid = ctx.query.a
    if (!topid) return ctx.helper.ReturnErrorCode(400)
    let { res } = await ctx.curl('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
      data: {
        page: 'detail',
        type: 'top',
        tpl: 3,
        platform: 'h5',
        topid,
        needNewCode: 1,
        g_tk: 5381,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'jsonp'
      },
      dataType: 'text'
    })
    if (res.status !== 200) ctx.helper.helperReturnErrorCode(500)
    res = JSON.parse(res.data)
    res = await this._parse(
      await Promise.all(this._normalizeSongs(res.songlist.map(item => item.data)))
    )
    await ctx.app.cache.set(`${ctx.params[0]}-${ctx.query.mode}-${topid}`, res, 86400)
    return res
  }
  async search() {
    let { ctx } = this,
      // w -> 搜索词  p -> 第几页  zhida(boolean) -> 是否显示人物 n -> 搜索结果数量
      { a, p, n, zhida } = ctx.query
    if (!a) ctx.helper.ReturnErrorCode(400)
    n = n >= 100 ? 99 : n
    let res = await ctx.curl('https://c.y.qq.com/soso/fcgi-bin/client_search_cp', {
      headers: {
        param: 'callback',
        prefix: 'jp',
        referer: 'https://y.qq.com/',
        origin: 'https://y.qq.com',
        host: 'c.y.qq.com'
      },
      dataType: 'text',
      data: {
        w: a,
        p: p || 1,
        catZhida: zhida ? 1 : 0,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'urf-8',
        sem: 1,
        aggr: 0,
        perpage: n,
        n: n,
        uid: 0,
        platform: 'h5',
        ct: 24,
        qqmusic_ver: 1298,
        new_json: 1,
        remoteplace: 'txt.yqq.song',
        searchid: 65103024149790195,
        aggr: 1,
        cr: 1,
        lossless: 0,
        flag_qc: 0,
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq.json',
        needNewCode: 0
      }
    })
    if (res.status !== 200) ctx.helperReturnErrorCode(500)
    res = await this._parse(
      await Promise.all(
        this._normalizeSongs(this._formatJsonpData(res.data, 'callback').data.song.list)
      )
    )
    await ctx.app.cache.set(
      `${ctx.params[0]}-${ctx.query.mode}-${a}${p ? `-${p}` : ''}${n ? `-${n}` : ''}${
        zhida ? `-${zhida}` : ''
      }`,
      res,
      86400
    )
    return res
  }
  _genUrlMid(mids, types) {
    const guid = this._getUid()
    return {
      module: 'vkey.GetVkeyServer',
      method: 'CgiGetVkey',
      param: {
        guid,
        songmid: mids,
        songtype: types,
        uin: '0',
        loginflag: 0,
        platform: '23'
      }
    }
  }
  _getUid() {
    if (this._uid) {
      return this._uid
    }
    if (!this._uid) {
      const t = new Date().getUTCMilliseconds()
      this._uid = '' + ((Math.round(2147483647 * Math.random()) * t) % 1e10)
    }
    return this._uid
  }
  _formatJsonpData(data, str) {
    data = data.match(new RegExp(`${str}(.*)`))[1]
    data = data.substr(1, data.length - 2)
    return JSON.parse(data)
  }
  _normalizeSongs(list) {
    // let that = this
    return list.map(async item => {
      // let lyric = await that.lyric(item.songmid || item.mid)
      return {
        id: item.songid || item.id,
        mid: item.songmid || item.mid,
        singer: item.singer.map(i => i.name).join('/'),
        name: item.songname || item.name,
        album: item.albumname || (item.album && item.album.name) || '',
        duration: item.interval || 0,
        platform: 'tencent',
        image:
          item.albummid || (item.album && item.album.mid)
            ? `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
                item.albummid || (item.album && item.album.mid)
              }.jpg?max_age=2592000`
            : null
        // lyric: !lyric.code ? new Buffer(lyric.lyric, 'base64').toString() : '该音乐没有歌词'
      }
    })
  }
  _parse(list) {
    let mids = [],
      types = []

    list.forEach(item => {
      mids.push(item.mid)
      types.push(0)
    })
    return new Promise((resolve, reject) => {
      this.tryTime = 4
      let request = async () => {
          let urlMid = this._genUrlMid(mids, types),
            res = await this.url(urlMid)
          if (!res.code) {
            let NewUrlMid = res.req_0
            if (NewUrlMid && !NewUrlMid.code) {
              const purlMap = {}
              NewUrlMid.data.midurlinfo.forEach(item => {
                if (item.purl) {
                  purlMap[item.songmid] = item.purl
                }
              })
              if (Object.keys(purlMap).length > 0) {
                let filters = list.filter(item => {
                  let purl = purlMap[item.mid]
                  if (purl) {
                    item.url =
                      purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl
                    return true
                  }
                  return false
                })
                resolve(filters)
              } else {
                setTimeout(retry, 1000)
              }
            } else {
              setTimeout(retry, 1000)
            }
          } else {
            setTimeout(retry, 1000)
          }
        },
        retry = () => {
          if (--this.tryTime >= 0) {
            request()
          } else {
            reject(new Error('获取歌曲失败'))
          }
        }
      request()
    })
  }
}
module.exports = tencentService
