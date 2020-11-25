'use strict'
/**
 * @file NeteaseMusic Class
 * @author Surmon <https://github.com/surmon-china>
 */
exports.__esModule = true
var http_1 = require('http')
var crypto_1 = require('crypto')
var querystring_1 = require('querystring')
var randomUserAgent = function () {
  var userAgentList = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89;GameHelper',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:46.0) Gecko/20100101 Firefox/46.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:46.0) Gecko/20100101 Firefox/46.0',
    'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)',
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)',
    'Mozilla/5.0 (Windows NT 6.3; Win64, x64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/13.10586',
    'Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1'
  ]
  var num = Math.floor(Math.random() * userAgentList.length)
  return userAgentList[num]
}
var randomCookies = function (musicU) {
  var CookiesList = [
    'os=pc; osver=Microsoft-Windows-10-Professional-build-10586-64bit; appver=2.0.3.131777; channel=netease; __remember_me=true',
    'MUSIC_U=' +
      musicU +
      '; buildver=1506310743; resolution=1920x1080; mobilename=MI5; osver=7.0.1; channel=coolapk; os=android; appver=4.2.0',
    'osver=%E7%89%88%E6%9C%AC%2010.13.3%EF%BC%88%E7%89%88%E5%8F%B7%2017D47%EF%BC%89; os=osx; appver=1.5.9; MUSIC_U=' +
      musicU +
      '; channel=netease;'
  ]
  var num = Math.floor(Math.random() * CookiesList.length)
  return CookiesList[num]
}
// DONT CHANGE!!
var SECRET = '7246674226682325323F5E6544673A51'
// private functions
var neteaseAESECB = Symbol('neteaseAESECB')
var getHttpOption = Symbol('getHttpOption')
var getRandomHex = Symbol('getRandomHex')
var makeRequest = Symbol('makeRequest')
var NeteaseMusic = /** @class */ (function () {
  function NeteaseMusic(options) {
    if (options === void 0) {
      options = {}
    }
    NeteaseMusic.cookie = ''
    if (options.cookie) {
      NeteaseMusic.cookie = options.cookie
    }
  }
  /**
   * 私有方法，加密
   * @param {Object} body 表单数据
   * @return {String} 加密后的表单数据
   */
  NeteaseMusic.prototype[neteaseAESECB] = function (body) {
    var password = Buffer.from(SECRET, 'hex').toString('utf8')
    var cipher = crypto_1.createCipheriv('aes-128-ecb', password, '')
    var hex = cipher.update(JSON.stringify(body), 'utf8', 'hex') + cipher.final('hex')
    var form = querystring_1.stringify({
      eparams: hex.toUpperCase()
    })
    return form
  }
  /**
   * 获取请求选项
   * @param {String} method GET | POST
   * @param {String} path http 请求路径
   * @param {Integer} contentLength 如何是 POST 请求，参数长度
   * @return Object
   */
  NeteaseMusic.prototype[getHttpOption] = function (method, path, contentLength) {
    var options = {
      port: 80,
      path: path,
      method: method,
      hostname: 'music.163.com',
      headers: {
        referer: 'https://music.163.com/',
        cookie: this.cookie || randomCookies(this[getRandomHex](128)),
        'user-agent': randomUserAgent()
      }
    }
    if ('POST' === method) {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      if (contentLength) {
        options.headers['Content-Length'] = contentLength
      }
    }
    return options
  }
  /**
   * 获取随机字符串
   * @param {Integer} length 生成字符串的长度
   */
  NeteaseMusic.prototype[getRandomHex] = function (length) {
    var isOdd = length % 2
    var randHex = crypto_1.randomFillSync(Buffer.alloc((length + isOdd) / 2)).toString('hex')
    return isOdd ? randHex.slice(1) : randHex
  }
  /**
   * 发送请求
   * @param {Object} options 请求选项
   * @param {String} form 表单数据
   * @return Promise
   */
  NeteaseMusic.prototype[makeRequest] = function (options, form) {
    return new Promise(function (resolve, reject) {
      var request = http_1.request(options, function (response) {
        response.setEncoding('utf8')
        // TODO: status -> statusCode
        var responseBody = ''
        var hasResponseFailed = response.statusCode && response.statusCode >= 400
        if (hasResponseFailed) {
          reject('Request to ' + response.url + ' failed with HTTP ' + response.statusCode)
        }
        /* the response stream's (an instance of Stream) current data. See:
         * https://nodejs.org/api/stream.html#stream_event_data */
        response.on('data', function (chunk) {
          return (responseBody += chunk.toString())
        })
        // once all the data has been read, resolve the Promise
        response.on('end', function () {
          if (!responseBody) {
            return reject('remote result empty')
          }
          try {
            return resolve(JSON.parse(responseBody))
          } catch (error) {
            return resolve(responseBody)
          }
        })
      })
      request.on('error', function (err) {
        console.error('problem with request: ' + err.message)
      })
      // write data to request body
      if (form) {
        request.write(form)
      }
      request.end()
    })
  }
  /**
   * 根据关键词获取歌曲列表
   * @param {Integer} string 关键词
   * @return {Promise}
   */
  NeteaseMusic.prototype.search = function (keyword, page, limit) {
    if (page === void 0) {
      page = 1
    }
    if (limit === void 0) {
      limit = 3
    }
    var body = {
      method: 'POST',
      params: {
        s: keyword,
        type: 1,
        limit: limit,
        total: true,
        offset: page - 1
      },
      url: 'http://music.163.com/api/cloudsearch/pc'
    }
    var form = this[neteaseAESECB](body)
    var options = this[getHttpOption]('POST', '/api/linux/forward', Buffer.byteLength(form))
    return this[makeRequest](options, form)
  }
  /**
   * 根据艺术家 id 获取艺术家信息
   * @param {Integer} string 艺术家 id
   * @return {Promise}
   */
  NeteaseMusic.prototype.artist = function (id, limit) {
    if (limit === void 0) {
      limit = 50
    }
    var body = {
      method: 'GET',
      params: {
        id: id,
        ext: true,
        top: limit
      },
      url: 'http://music.163.com/api/v1/artist/' + id
    }
    var form = this[neteaseAESECB](body)
    var options = this[getHttpOption]('POST', '/api/linux/forward', Buffer.byteLength(form))
    return this[makeRequest](options, form)
  }
  /**
   * 根据歌单 id 获取歌单信息和歌曲列表
   * @param {Integer} string 歌单 id
   * @return {Promise}
   */
  NeteaseMusic.prototype.playlist = function (id) {
    var body = {
      method: 'POST',
      params: {
        id: id,
        n: 1000
      },
      url: 'http://music.163.com/api/v3/playlist/detail'
    }
    var form = this[neteaseAESECB](body)
    var options = this[getHttpOption]('POST', '/api/linux/forward', Buffer.byteLength(form))
    return this[makeRequest](options, form)
  }
  /**
   * 根据歌单 id 获取歌单信息和歌曲列表 !!!临时替代方案
   * @param {Integer} string 歌单 id
   * @return {Promise}
   */
  NeteaseMusic.prototype._playlist = function (id) {
    var body = {
      method: 'POST',
      params: {
        id: id,
        n: 1000
      },
      url: '/api/v3/playlist/detail'
    }
    body.url += '?' + querystring_1.stringify(body.params)
    var options = this[getHttpOption](body.method, body.url)
    return this[makeRequest](options)
  }
  /**
   * 根据专辑 id 获取专辑信息及歌曲列表
   * @param {Integer} string 专辑 id
   * @return {Promise}
   */
  NeteaseMusic.prototype.album = function (id) {
    var body = {
      method: 'GET',
      params: { id: id },
      url: 'http://music.163.com/api/v1/album/' + id
    }
    var form = this[neteaseAESECB](body)
    var options = this[getHttpOption]('POST', '/api/linux/forward', Buffer.byteLength(form))
    return this[makeRequest](options, form)
  }
  /**
   * 根据歌曲 id 获取歌曲信息
   * @param {Integer} string 歌曲 id
   * @return {Promise}
   */
  NeteaseMusic.prototype.song = function (id) {
    var body = {
      method: 'POST',
      params: {
        c: '[' + id + ']'
      },
      url: 'http://music.163.com/api/v3/song/detail'
    }
    var form = this[neteaseAESECB](body)
    var options = this[getHttpOption]('POST', '/api/linux/forward', Buffer.byteLength(form))
    return this[makeRequest](options, form)
  }
  /**
   * 根据歌曲 id 获取歌曲资源地址
   * @param {Integer} string 歌曲 id
   * @return {Promise}
   */
  NeteaseMusic.prototype.url = function (id, br) {
    if (br === void 0) {
      br = 320
    }
    var body = {
      method: 'POST',
      params: {
        ids: [id],
        br: br * 1000
      },
      url: 'http://music.163.com/api/song/enhance/player/url'
    }
    var form = this[neteaseAESECB](body)
    var options = this[getHttpOption]('POST', '/api/linux/forward', Buffer.byteLength(form))
    return this[makeRequest](options, form)
  }
  /**
   * 根据歌曲 id 获取歌词
   * @param {Integer} string 歌曲 id
   * @return {Object}
   */
  NeteaseMusic.prototype.lyric = function (id) {
    var body = {
      method: 'POST',
      params: {
        id: id,
        os: 'linux',
        lv: -1,
        kv: -1,
        tv: -1
      },
      url: 'http://music.163.com/api/song/lyric'
    }
    var form = this[neteaseAESECB](body)
    var options = this[getHttpOption]('POST', '/api/linux/forward', Buffer.byteLength(form))
    return this[makeRequest](options, form)
  }
  /**
   * 根据封面图片 id 获取图片地址
   * @param {Integer} string 图片 id
   * @return {Object}
   */
  NeteaseMusic.prototype.picture = function (id, size) {
    if (size === void 0) {
      size = 300
    }
    var md5 = function (data) {
      var buf = Buffer.from(data)
      var str = buf.toString('binary')
      return crypto_1.createHash('md5').update(str).digest('base64')
    }
    var neteasePickey = function (id) {
      id = String(id)
      var magic = '3go8&$8*3*3h0k(2)2'.split('')
      var songId = id.split('').map(function (item, index) {
        return String.fromCharCode(item.charCodeAt(0) ^ magic[index % magic.length].charCodeAt(0))
      })
      return md5(songId.join('')).replace(/\//g, '_').replace(/\+/g, '-')
    }
    return Promise.resolve({
      url:
        'https://p3.music.126.net/' +
        neteasePickey(id) +
        '/' +
        id +
        '.jpg?param=' +
        size +
        'y' +
        size
    })
  }
  return NeteaseMusic
})()
module.exports = NeteaseMusic
