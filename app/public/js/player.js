;(async function () {
  const Element = document.getElementById('aggregate'),
    uuid = Element.getAttribute('key'),
    domain = '<?--?>'

  function request(url = '', option = {}) {
    return new Promise((resolve, reject) => {
      if (!option.requestObj) {
        option.requestObj = {}
        option.requestObj.headers = {
          uuid
        }
      } else {
        option.requestObj.headers.uuid = uuid
      }
      fetch(url, option.requestObj)
        .then(res => res[option.dataType || 'json']())
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  function $(select, all) {
    return !all ? document.querySelector(select) : document.querySelectorAll(select)
  }
  class Notice {
    constructor(msg) {
      this.timer = null
      this.create()
      if (setting.welcomeShow) this.show(msg)
      console.log(
        [
          '                   _ooOoo_',
          '                  o8888888o',
          '                  88" . "88',
          '                  (| -_- |)',
          '                  O\\  =  /O',
          "               ____/`---'\\____",
          "             .'  \\\\|     |//  `.",
          '            /  \\\\|||  :  |||//  \\',
          '           /  _||||| -:- |||||-  \\',
          '           |   | \\\\\\  -  /// |   |',
          "           | \\_|  ''\\---/''  |   |",
          '           \\  .-\\__  `-`  ___/-. /',
          "         ___`. .'  /--.--\\  `. . __",
          '      ."" \'<  `.___\\_<|>_/___.\'  >\'"".',
          '     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |',
          '     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /',
          "======`-.____`-.___\\_____/___.-`____.-'======",
          "                   `=---='",
          '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
          '         佛祖保佑       永无BUG'
        ].join('\n')
      )
    }
    show(msg) {
      if (this.timer) clearTimeout(this.timer)
      let ele = $('.aggregate-notice > span')
      ele.innerText = msg
      $('.aggregate-notice').className = 'aggregate-notice'
      this.timer = setTimeout(() => {
        this.hide()
      }, 3500)
    }
    hide() {
      let ele = $('.aggregate-notice')
      ele.className = 'aggregate-notice a-x-hide'
    }
    create() {
      let notice = document.createElement('div')
      let playerStyle = document.createElement('style')
      playerStyle.innerText = `    
            .aggregate-notice{position:fixed;top:5%;right:0;z-index:10002;display:flex;box-sizing:border-box;margin-right:15px;padding:10px 20px 10px 20px;max-width:75%;min-width:130px;border:solid #fff 2px;border-radius:5px;background-color:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);color:#7b7474;font-family:Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,微软雅黑,Arial,sans-serif;transition:all .5s;justify-content:center;flex-direction:column}.a-x-hide{transform:translate(110%,0)}@font-face{font-family:iconfont;src:url(${domain}/iconfont/iconfont.eot);src:url(${domain}/iconfont/iconfont.eot?#iefix) format('embedded-opentype'),url(${domain}/iconfont/iconfont.woff2) format('woff2'),url(${domain}/iconfont/iconfont.woff) format('woff'),url(${domain}/iconfont/iconfont.ttf) format('truetype'),url(${domain}/iconfont/iconfont.svg#iconfont) format('svg')}.iconfont{font-style:normal;font-size:16px;font-family:iconfont!important;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:.2px;-moz-osx-font-smoothing:grayscale}#aggregate-run{z-index:10001;position:fixed;bottom:20px;left:20px;display:flex;overflow:hidden;width:150px;height:100px;border-radius:10px;background:#fff;box-shadow:5px 5px 9px 0 #0000004f;font-family:Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,微软雅黑,Arial,sans-serif;user-select:none;flex-direction:column}#aggregate-run>.aggregate-run-pic{position:relative;display:flex;background-image:linear-gradient(to bottom right,#12c2e9 0,#c471ed 50%,#f64f59 100%);background-position:center;background-position:center;background-size:100%;background-repeat:no-repeat;cursor:move;flex:1;flex-direction:column;justify-content:center}#aggregate-run>.aggregate-run-desc{display:flex;padding:0 6px;color:#65656d;cursor:pointer;flex:1;flex-direction:column;justify-content:center}#aggregate-run .aggregate-run-line{position:absolute;right:0;bottom:0;left:0;width:0;height:5px;border-radius:50px;background:#81eefffa}.aggregate-run-desc p{margin:0;font-size:10px}.aggregate-run-btn *{cursor:pointer}.aggregate-run-btn{display:flex;color:#fff;flex-direction:row-reverse}.aggregate-run-btn>.player-next:hover{opacity:1!important}.aggregate-run-btn>.player-prev:hover{opacity:1!important}.aggregate-player * {box-sizing:content-box  !important ;}.aggregate-player{position:fixed;top:0;right:0;bottom:0;left:0;z-index:10001;width:100vw;height:100vh;background:#222;font-family:Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,微软雅黑,Arial,sans-serif;user-select:none}.a-c-trs{transition:all .5s}.a-c-flex{display:flex}.a-c-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.a-c-block{display:block}.a-c-w50{width:50%}.a-c-hide{display:none}.a-p-hide{border-radius:50%;opacity:.5;transform:scale(0);transform-origin:center}.aggregate-close{position:absolute;top:10px;right:20px;z-index:10003;width:40px;height:40px;cursor:pointer}.aggregate-close::after,.aggregate-close::before{position:absolute;left:20px;display:block;width:4px;height:inherit;background:#fff;content:''}.aggregate-close::after{transition:all .7s;transform:rotate(45deg)}.aggregate-close::before{transition:all .35s;transform:rotate(-45deg)}.a-close-hide::after{transform:rotate(45deg) translate(50px,-210px)!important}.a-close-hide::before{transform:rotate(-45deg) translate(-50px,-210px)!important}.aggregate-make{width:100%;height:100%;background-position:center;background-size:cover;background-size:100% 100%;background-repeat:no-repeat;filter:blur(35px)}.aggregate-make>.make{width:100%;height:100%;background:rgba(0,0,0,.2)}.aggregate-main{position:fixed;right:0;bottom:0;left:0;display:flex;width:inherit;max-height:224px;box-shadow:0 1px 5px 0 #000;color:#fff;flex-direction:column}.aggregate-main-top>img{padding:20px;width:90px;height:90px}.aggregate-main-top>div{display:flex;overflow:hidden;justify-content:center;flex-direction:column}.aggregate-main-top>img{padding:20px;width:90px;height:90px}.aggregate-main-top>div>span{margin-top:10px}.aggregate-main-top>div>h3{margin:0}.aggregate-main>.aggregate-main-center{padding:0 20px;font-size:14px;justify-content:space-evenly;align-items:center}.aggregate-main-center>div{height:7px;border-radius:5px;background:rgba(0,0,0,.2);flex:1}.aggregate-main-center>span:nth-of-type(1){padding-right:10px}.aggregate-progress-block{width:0%;height:7px;border-radius:5px;background:#fff}.aggregate-main-center>span:nth-child(3){padding-left:10px}.aggregate-main>.aggregate-main-bottom{display:flex;margin:20px;justify-content:space-between}.aggregate-main-bottom i{font-weight:100;font-size:20px;cursor:pointer}.aggregate-main-bottom div:nth-of-type(1) div:hover,.aggregate-main-bottom div:nth-of-type(2) div:hover{background:#b19a9a81}.aggregate-main-bottom div:nth-of-type(1) div,.aggregate-main-bottom div:nth-of-type(2) div{display:flex;margin-right:5px;padding:5px;width:25px;height:25px;border-radius:50%;justify-content:center;align-items:center}.aggregate-center{position:absolute;bottom:225px;overflow:auto;box-sizing:border-box;padding:5px 20px 5px 20px;width:100%;height:calc(100% - 285px);border-radius:10px;background:#c7c7c729}.aggregate-list{margin:0;padding:0;width:100%;border:none;border-collapse:collapse;color:#fff;table-layout:fixed;border-spacing:0}.aggregate-lyric{padding:0;transition:transform 1s ease-in-out}.aggregate-lyric>li{color:#e2e2e36b;list-style:none;text-align:center;white-space:nowrap;font-weight:700;font-size:20px;line-height:3;transition:all .35s}@media screen and (max-width:400px){.aggregate-lyric>li{font-size:15px!important}}.aggregate-active-lyric-item{color:#fff!important}.aggregate-list > tbody tr{background-color: transparent;padding-left:10px;line-height:2.5;cursor:pointer;transition:all .3s}.aggregate-list tr:hover{background:#edeff140}.aggregate-current-song{background:#00000047}.aggregate-media{margin:0;padding:0;height:100%}.aggregate-list td,.aggregate-list tr{border: none !important;}
            `

      document.head.appendChild(playerStyle)
      notice.className = 'aggregate-notice a-x-hide'
      notice.innerHTML = '<span></span>'
      document.body.appendChild(notice)
    }
  }

  class Player {
    constructor(notice) {
      this.loadedPlayList = null
      this.audio = null
      this.currentLyricLine = null
      this.currentPlayList = null
      this.state = false
      this.notice = notice
      this.lyricState = false
      this.ac = null
      this.analyser = null
      this.mediaRequestAnimateFrame = null
      this.moveing = null
      setting.mode = +setting.mode
      try {
        this.create()
        this.init()
        notice.show('播放器准备就绪!')
      } catch (error) {
        console.log(error)
        notice.show('初始化失败,F12打开控制台查看')
      }
    }
    async init() {
      let playerRunDesc = $('.aggregate-run-desc'),
        playClose = $('.aggregate-close')
      this.bindMouseDrag($('#aggregate-run'))
      let RunEnd = e => {
        if (e.propertyName === 'transform') {
          $('.aggregate-close').className = 'aggregate-close'
          $('.aggregate-player').removeEventListener('transitionend', RunEnd)
        }
      }
      $('.aggregate-player').addEventListener('transitionend', RunEnd)
      playerRunDesc.onclick = e => {
        e.stopPropagation()
        this.state = true
        if ($('.aggregate-lyric').className.indexOf('a-c-hide') === -1) this.lyricState = true
        cancelAnimationFrame(this.mediaRequestAnimateFrame)
        if ($('.aggregate-media').className.indexOf('a-c-hide') === -1)
          this.mediaAnimate(this.analyser, $('.aggregate-media canvas').getContext('2d'))
        $('.aggregate-player').className = 'aggregate-player a-c-trs'
      }
      playClose.onclick = e => {
        this.state = false
        this.lyricState = false
        cancelAnimationFrame(this.mediaRequestAnimateFrame)
        if (this.audio) {
          let that = this
          this.audio.ontimeupdate()
        }
        $('.aggregate-player').className = 'aggregate-player a-p-hide a-c-trs'
      }
      $('.song-list').addEventListener('click', () => {
        this.togglePanel('playlist')
        this.lyricState = false
      })
      this.onTr()
      $('.aggregate-run-line').style.backgroundColor = setting.color || '#333'
      $('.aggregate-progress-block').style.backgroundColor = setting.color || 'white'
      if (setting.autoPlay) {
        let res,
          playlist = loadedPlayList.find(item => item.name === setting.album)
        if (!playlist) return this.notice.show('自动播放失败,歌单查询不到')
        if (playlist.platform) {
          res = await request(
            domain + '/api/' + playlist.platform + '?mode=parseRankList&a=' + playlist.uuid
          )
        } else {
          res = JSON.parse(
            (await request(domain + '/play/playlist?a=find&uuid=' + playlist.uuid)).data.playlist
          )
        }
        playlist.songs = res
        this.currentPlayList = res
        setTimeout(() => {
          this.setCurrentSong(this.currentPlayList[0])
        }, 1500)
      }
    }
    async select(current) {
      let title = $('.aggregate-center h2')
      if (title.innerHTML.indexOf('歌单') !== -1) {
        let find = loadedPlayList.filter(
            item =>
              item.name === current.firstElementChild.innerText &&
              item.uuid == current.getAttribute('index')
          )[0],
          uid = find.uuid,
          platform = find.platform,
          res
        if (platform) {
          if (find.songs) {
            res = find.songs
          } else {
            res = await request(domain + '/api/' + platform + '?mode=parseRankList&a=' + uid)
            find.songs = res
          }
        } else {
          if (find.songs) {
            res = find.songs
          } else {
            res = await request(domain + '/play/playlist?a=find&uuid=' + uid)
            res = JSON.parse(res.data.playlist)
            find.songs = res
          }
        }

        if (!res || res.length) {
          let str = this.toList(res)
          $('.aggregate-list tbody').innerHTML = str
          this.onTr()
          title.innerHTML =
            ' <i class="iconfont  return-playlist" style="font-weight: 100; font-size: 25px; cursor: pointer;">&#xe987; </i>   <i class="iconfont" style="font-weight: 100; font-size: 25px;margin:10px">&#xe620;</i>歌曲列表: <span>' +
            current.firstElementChild.innerText +
            '</span>'
          $('.return-playlist').onclick = () => {
            title.innerHTML =
              '<i class="iconfont" style="font-weight: 100; font-size: 25px;margin:10px;vertical-align: sub">&#xe65f;</i>歌单列表'
            $('.aggregate-list tbody').innerHTML = this.loadedPlayList
            this.onTr()
          }
        } else {
          this.notice.show(res.msg)
        }
      } else {
        let playlist = title.querySelector('span').innerText,
          songs = loadedPlayList.find(item => item.name === playlist).songs
        let currentSong = !songs.length
          ? songs
          : songs.find(item => +current.getAttribute('index') === item.id)
        this.currentPlayList = songs
        this.setCurrentSong(currentSong)
      }
    }

    async setCurrentSong(song) {
      if (!song.url) {
        setTimeout(() => {
          this.currentSong ? $('.player-next').onclick() : ''
        }, 3000)
        return this.notice.show(`歌曲解析失败${this.currentSong ? ',正在切换下一首' : ''}`)
      }
      this.notice.show(`正在播放歌曲: ${song.name}`)
      let pic = $('.aggregate-main-top > img'),
        bg = $('.aggregate-make'),
        Time = $('.aggregate-main-center span', true),
        name = $('.aggregate-main-top > div > h3'),
        singer = $('.aggregate-main-top > div > span'),
        minPic = $('#aggregate-run>.aggregate-run-pic'),
        minName = $('#aggregate-run > .aggregate-run-desc p:first-child'),
        minSinger = $('#aggregate-run > .aggregate-run-desc p:last-child')
      pic.src = song.image
      bg.style.backgroundImage = `url(${song.image})`
      name.innerText = song.name
      minName.innerText = song.name
      minSinger.innerText = song.singer
      singer.innerText = song.singer
      pic.src = song.image
      minPic.style.backgroundImage = "url('" + song.image + "')"
      if (!this.audio) {
        this.audio = new Audio()
        if (setting.mediaShow) this.audio.crossOrigin = 'anonymous'
        this.audio.src = song.url

        this.audio.onerror = async () => {
          await this.handlerError()
        }

        this.audio.ondurationchange = function () {
          let second = ~~(this.duration % 60)
          Time[1].innerText = `${~~(this.duration / 60)}:${second >= 10 ? '' : 0}${second}`
        }

        this.audio.oncanplaythrough = this.audio.play

        this.audio.onended = () => {
          $('.player-toggle i').innerHTML = '&#xe630;'
          switch (setting.mode) {
            case 0:
              $('.player-next').onclick()
              break
            case 1:
              let random = () => {
                var curIndex = this.currentPlayList.findIndex(item => item === this.currentSong),
                  randomIndex = Math.floor(Math.random() * this.currentPlayList.length)
                return randomIndex === curIndex ? random(this.currentPlayList.length) : randomIndex
              }
              this.setCurrentSong(this.currentPlayList[random()])
              break
          }
        }

        this.audio.volume = setting.volume / 100
        let that = this
        this.audio.ontimeupdate = function () {
          var percent = this.currentTime / this.duration
          if (that.state) {
            let second = ~~(this.currentTime % 60),
              minutes = ~~(this.currentTime / 60)
            let parse = `${minutes >= 10 ? '' : 0}${minutes}:${second >= 10 ? '' : 0}${second}`
            Time[0].innerHTML = parse
            $('.aggregate-progress-block').style.width = `${100 * percent}%`
            if (that.currentSong.lyric && that.lyricState && that.currentSong.lyric.size > 1) {
              let lis = [...$('.aggregate-lyric').children],
                current = that.currentSong.lyric.get(parse)
              if (!current) return
              lis.forEach(item => (item.className = ''))
              let find = lis.find(item => {
                let res = +item.getAttribute('index') === current.i
                if (res) {
                  item.className = 'aggregate-active-lyric-item'
                }
                return res
              })
              if (!find) return
              if (find.offsetTop >= find.offsetHeight * 5)
                $('.aggregate-lyric').style.transform = `translateY(-${
                  find.offsetTop - find.offsetHeight * 5
                }px)`
              else $('.aggregate-lyric').style.transform = `translateY(0px)`
            }
          } else {
            $('.aggregate-run-line').style.width = `${100 * percent}%`
          }
        }

        $('.player-toggle').onclick = () => {
          let ele = $('.player-toggle i')
          if (this.audio.paused) {
            this.audio.play()
            ele.innerHTML = '&#xe9aa;'
            $('#aggregate-run').className = 'aggregate-start'
            if (this.analyser) cancelAnimationFrame(this.mediaRequestAnimateFrame)
            this.mediaAnimate(this.analyser, $('.aggregate-media canvas').getContext('2d'))
          } else {
            this.audio.pause()
            ele.innerHTML = '&#xe630;'
            cancelAnimationFrame(this.mediaRequestAnimateFrame)
            $('#aggregate-run').className = ''
          }
        }
        $('.player-prev', true).forEach(item => {
          item.onclick = () => {
            var curIndex = this.currentPlayList.findIndex(item => item === this.currentSong),
              target = this.currentPlayList[
                curIndex <= 0 ? this.currentPlayList.length - 1 : (curIndex -= 1)
              ]
            this.setCurrentSong(target)
            cancelAnimationFrame(this.mediaRequestAnimateFrame)
            if (
              this.analyser &&
              $('.aggregate-media').className.indexOf('a-c-hide') === -1 &&
              this.state
            )
              this.mediaAnimate(this.analyser, $('.aggregate-media canvas').getContext('2d'))
          }
        })

        $('.player-next', true).forEach(item => {
          item.onclick = () => {
            var curIndex = this.currentPlayList.findIndex(item => item === this.currentSong),
              target = this.currentPlayList[
                curIndex >= this.currentPlayList.length - 1 ? 0 : (curIndex += 1)
              ]
            this.setCurrentSong(target)
            cancelAnimationFrame(this.mediaRequestAnimateFrame)

            if (
              this.analyser &&
              $('.aggregate-media').className.indexOf('a-c-hide') === -1 &&
              this.state
            )
              this.mediaAnimate(this.analyser, $('.aggregate-media canvas').getContext('2d'))
          }
        })
        $('.player-mode').onclick = () => {
          this.audio.loop = false
          setting.mode = setting.mode >= 2 ? 0 : (setting.mode += 1)
          $('.player-mode i').innerHTML = `&#xe60${setting.mode};`
          if (setting.mode === 2) this.audio.loop = true
        }
        $('.aggregate-progress-box').onclick = e => {
          let ele = $('.aggregate-progress-box')
          var { clientX } = e,
            rect = ele.getBoundingClientRect()
          let percent = 1 * ((clientX - rect.left) / rect.width)
          this.audio.currentTime = this.audio.duration * percent
          $('.player-toggle i').innerHTML = '&#xe9aa;'
          cancelAnimationFrame(this.mediaRequestAnimateFrame)

          if (this.analyser && $('.aggregate-media').className.indexOf('a-c-hide') === -1)
            this.mediaAnimate(this.analyser, $('.aggregate-media canvas').getContext('2d'))
        }
        if (setting.lyricShow) {
          $('.toggle-lyric').onclick = async e => {
            let { lyric } = this.currentSong
            if (!lyric) {
              let str = await this.getCurrentLyric()
              this.togglePanel('lyric').innerHTML = str
            } else {
              let str = this.toLyricList(this.currentSong.lyric)
              this.togglePanel('lyric').innerHTML = str
            }
            $('.aggregate-center').scrollTop = 0
          }
        }
        if (setting.mediaShow) {
          $('.toggle-media').onclick = e => {
            if (!this.ac) {
              this.togglePanel('media', true)
              this.lyricState = false
              let canvasEle = $('.aggregate-media canvas'),
                canvasParentEle = $('.aggregate-media'),
                ctx = canvasEle.getContext('2d'),
                time
              ;(canvasEle.width = canvasParentEle.offsetWidth),
                (canvasEle.height = canvasParentEle.offsetHeight)
              window.onresize = function (e) {
                if (time) clearTimeout(time)
                time = setTimeout(() => {
                  ;(canvasEle.width = canvasParentEle.offsetWidth),
                    (canvasEle.height = canvasParentEle.offsetHeight)
                  ctx.fillStyle = setting.color || '#12c2e9'
                  ctx.shadowColor = 'rgba(0,0,0,.2)'
                  ctx.shadowBlur = 5
                  ctx.lineWidth = 3
                  ctx.strokeStyle = setting.color
                }, 500)
              }

              ctx.fillStyle = setting.color || '#12c2e9'
              ctx.shadowColor = 'rgba(0,0,0,.2)'
              ctx.shadowBlur = 5
              ctx.lineWidth = 3
              ctx.strokeStyle = setting.color
              this.ac = new (window.AudioContext ||
                window.webkitAudioContext ||
                window.mozAudioContext ||
                window.msAudioContext)()

              let source = (this.source = this.ac.createMediaElementSource(this.audio))
              this.analyser = this.ac.createAnalyser()
              this.analyser.fftSize = 512
              this.analyser.connect(this.ac.destination)
              source.connect(this.analyser)
              this.mediaAnimate(this.analyser, ctx)
            } else {
              cancelAnimationFrame(this.mediaRequestAnimateFrame)
              this.togglePanel('media')
            }
          }
          this.lyricState = false
        }
        $('#aggregate-run').className = 'aggregate-start'
      } else {
        this.audio.src = song.url
        $('#aggregate-run').className = 'aggregate-start'
      }
      //  this.audio.play()
      $('.player-toggle i').innerHTML = '&#xe9aa;'
      this.currentSong = song
      let lyricStr = await this.getCurrentLyric()

      $('.aggregate-lyric').innerHTML = lyricStr
      $('.aggregate-lyric').removeAttribute('style')
      $('.aggregate-center').scrollTop = 0
    }
    mediaAnimate(analyser, ctx) {
      let that = this

      var arr = new Uint8Array(analyser.frequencyBinCount)
      //解决各浏览器的兼容性问题
      requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame
      cancelAnimationFrame =
        window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame
      function animate() {
        analyser.getByteFrequencyData(arr)
        that.draw(arr, ctx)
        // console.log(1)
        that.mediaRequestAnimateFrame = requestAnimationFrame(animate)
      }
      this.mediaRequestAnimateFrame = requestAnimationFrame(animate)
    }
    draw(Data, ctx) {
      let width = ctx.canvas.offsetWidth,
        height = ctx.canvas.offsetHeight,
        step = Math.round(Data.length / 128)
      ctx.clearRect(0, 0, width, height)
      ctx.beginPath()
      Data.forEach((item, i, arr) => {
        let value = arr[step * i],
          h = height / 2
        ctx.fillRect(i * 10 + width * 0.5, h, 3, -value + 1)
        ctx.fillRect(width * 0.5 - (i - 1) * 10, h, 3, -value + 1)
        ctx.fill()
        ctx.fillRect(i * 10 + width * 0.5, h, 3, value + 1)
        ctx.fillRect(width * 0.5 - (i - 1) * 10, h, 3, value + 1)
      })
    }
    async getCurrentLyric() {
      let { id, platform } = this.currentSong
      let res = await request(domain + '/api/' + platform + '?mode=lyric&a=' + id)
      if (res.code !== 200) return this.notice.show(res.msg || '获取歌词失败')
      switch (platform) {
        case 'netease':
          if (res.nolyric) {
            return this.toLyricList(
              (this.currentSong.lyric = new Map([['00:00', { content: '该歌曲没有歌词', i: 1 }]]))
            )
          }
          let lyric = Object.keys(res)
          lyric = lyric.filter(item => res[item] && res[item].version >= 1 && res[item].lyric)
          if (!lyric.length)
            return this.toLyricList(
              (this.currentSong.lyric = new Map([['00:00', { content: '该歌曲没有歌词', i: 1 }]]))
            )
          if (lyric.find(item => item === 'tlyric')) {
            lyric = res[lyric.find(item => item === 'tlyric')]
          } else {
            lyric = res[lyric.find(item => item === 'lrc')]
          }
          var parse = lyric.lyric
            .split(/\n/)
            .slice(0, -1)
            .map((item, i) => {
              if (/^\[\d{2}:\d{2}/.test(item)) {
                let match = item.match('(.+])(.*)'),
                  time = match[1].match(/^\[(\d{2}:\d{2})/)[1],
                  content = match[2]
                return [
                  time,
                  {
                    content,
                    i
                  }
                ]
              }
            })
            .filter(item => {
              return item && item[1].content
            })
          parse = new Map(parse)
          this.currentSong.lyric = parse

          break
      }
      return this.toLyricList(this.currentSong.lyric)
    }
    toLyricList(data) {
      return (
        data &&
        Array.from(data)
          .map(item => {
            return `<li index=${item[1].i}>${item[1].content}</li>`
          })
          .join('')
      )
    }
    togglePanel(target, flag) {
      let eles = {
        playlist: $('.aggregate-playlist'),
        lyric: $('.aggregate-lyric'),
        media: $('.aggregate-media')
      }

      if (target !== 'playlist') eles.playlist.className = 'aggregate-playlist a-c-hide'
      if (target !== 'lyric') eles.lyric.className = 'aggregate-lyric a-c-hide'
      if (target !== 'media') eles.media.className = 'aggregate-media a-c-hide'
      $('.aggregate-center').style.overflow = ''
      if (flag !== undefined) {
        eles[target].className = flag ? `aggregate-${target}` : `aggregate-${target} a-c-hide`
      } else {
        if (eles[target].className.indexOf('a-c-hide') !== -1) {
          eles[target].className = `aggregate-${target}`
          if (target === 'lyric') {
            this.lyricState = true
            $('.aggregate-center').style.overflow = 'hidden'
            cancelAnimationFrame(this.mediaRequestAnimateFrame)
          }
          if (target === 'media') {
            cancelAnimationFrame(this.mediaRequestAnimateFrame)
            this.mediaAnimate(this.analyser, $('.aggregate-media canvas').getContext('2d'))
            this.lyricState = false
          }
          if (target === 'playlist') {
            this.lyricState = false
            cancelAnimationFrame(this.mediaRequestAnimateFrame)
          }
        } else {
          eles[target].className = `aggregate-${target} a-c-hide`
          if (target === 'media') cancelAnimationFrame(this.mediaRequestAnimateFrame)
          if (target === 'lyric') this.lyricState = false
        }
      }

      return eles[target]
    }
    bindMouseDrag(playerRun) {
      let disx, disy, Endx, Endy
      const down = e => {
          if (!/aggregate-run-(pic|btn)/.test(e.target.className)) return
          ;(disx = (e.pageX || e.targetTouches[0].pageX) - playerRun.offsetLeft),
            (disy = (e.pageY || e.targetTouches[0].pageY) - playerRun.offsetTop)
          this.moveing = true
        },
        move = e => {
          if (!this.moveing) return
          let x = (e.pageX || e.targetTouches[0].pageX) - disx,
            y = (e.pageY || e.targetTouches[0].pageY) - disy

          x = x <= 0 ? 0 : x
          y = y <= 0 ? 0 : y

          let maxX = window.screen.width - playerRun.offsetWidth,
            maxY = window.screen.height - playerRun.offsetHeight
          x = x >= maxX ? maxX : x
          y = y >= maxY ? maxY : y

          playerRun.style.transform = `translate(${x - playerRun.offsetLeft + 'px'},${
            y - playerRun.offsetTop + 'px'
          })`
          Endx = x
          Endy = y
        },
        end = e => {
          playerRun.style.left = Endx + 'px'
          playerRun.style.top = Endy + 'px'
          playerRun.style.transform = ''
          this.moveing = false
        }

      playerRun.onmousedown = down
      playerRun.ontouchstart = down
      document.addEventListener('touchmove', move)
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', end)
      document.addEventListener('touchend', end)
    }
    async handlerError() {
      $('#aggregate-run').className = ''
      if (this.currentSong.error) {
        $('.player-next').onclick()
        return this.notice.show(this.currentSong.name + '解析失败,自动切换下一首')
      }
      switch (this.currentSong.platform) {
        case 'netease':
          if (this.currentSong.errorCount === 1) {
            await this.refreshOne()
          }
          await this.refreshPlaylist()
          break
      }
    }
    async refreshOne() {
      switch (this.currentSong.platform) {
        case 'netease':
          let res = await request(domain + '/api/netease?mode=url&a=' + this.currentSong.id)
          if (res.code !== 200) {
            return (this.currentSong.error = true)
          }
          let { url } = res.data[0]
          if (!url) return (this.currentSong.error = true)
          this.audio.src = url
          break
      }
    }
    async refreshPlaylist() {
      switch (this.currentSong.platform) {
        case 'netease':
          let ids = this.currentPlayList
            .filter(item => item.platform === 'netease')
            .map(item => item.id)
            .join(',')
          let res = await request(domain + '/api/netease', {
            requestObj: {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              mode: 'cors',
              credentials: 'include',
              body: JSON.stringify({
                mode: 'url',
                a: ids
              })
            }
          })
          if (res.code !== 200) {
            return (this.currentSong.errorCount = 1)
          }
          this.currentPlayList.forEach(item => {
            let find = res.data.find(item2 => item2.id === item.id)
            if (find) item.url = find.url
          })
          if (!this.currentSong.url) return (this.currentSong.errorCount = 1)
          this.audio.src = this.currentSong.url
          break
      }
    }
    onTr() {
      $('.aggregate-list > tbody tr', true).forEach(item => {
        item.onclick = () => {
          return this.select(item)
        }
      })
    }
    toList(data) {
      return (
        data &&
        data
          .map(item => {
            switch (item.platform) {
              case 'netease':
                var duration = item.duration / 1000,
                  second = ~~(duration % 60)
                duration = `${~~(duration / 60)}:${second >= 10 ? '' : 0}${second}`
                break
              case 'tencent':
                var minutes = Math.floor(item.duration / 60),
                  second = ~~(item.duration % 60),
                  duration = `${minutes}:${second >= 10 ? '' : 0}${second}`
                break
            }
            return ` <tr index='${item.id}' >
                          <td ><span class='a-c-text a-c-block ' >${item.name} </span></td>
                          <td ><span class='a-c-text  a-c-block ' >${item.singer}</span></td>
                          <td>${duration}</td>
                        </tr>`
          })
          .join('')
      )
    }
    create() {
      this.loadedPlayList = loadedPlayList
        .map(
          item =>
            `<tr index='${item.uuid}'>
              <td><span class="a-c-text  a-c-block " >${item.name}</span></td>
              <td>${item.platform || ''}</td>
            </tr>`
        )
        .join('')

      let playerRun = document.createElement('div'),
        playerMain = document.createElement('div')

      playerRun.id = 'aggregate-run'
      playerRun.innerHTML = `
        
            <div class='aggregate-run-pic' > 
                  <div  class='aggregate-run-btn'> 
                      <div class="player-next a-c-trs" style='opacity: .7'  ><i class="iconfont" style='font-size:25px' >&#xe648;</i></div>
                      <div class="player-prev a-c-trs"  style='opacity: .7' ><i class="iconfont"  style='font-size:25px' >&#xe64a;</i></div>
                   </div>
                   <div  class='aggregate-run-line' >
                   </div>
             </div>
            <div class='aggregate-run-desc' > 
                <p class='a-c-text' style='font-weight:bold' >Music</p>
                <p class='a-c-text'  >...</p>
            </div>
                      `
      playerMain.className = 'aggregate-player a-p-hide a-c-trs'
      playerMain.innerHTML = `<div class="aggregate-close a-close-hide"> </div>
                        <div class="aggregate-make">
                          <div class="make"></div>
                        </div>
                        <div class="aggregate-center">
                          <div class="aggregate-playlist">
                              <h2 style='font-size:16px;text-align: left;color:white' >
                                <i class="iconfont" style="font-weight: 100; vertical-align: sub; font-size: 25px;margin:10px">&#xe65f;</i>
                                歌单列表
                              </h2>
                              <table class="aggregate-list">
                          
                            
                                <tbody>
                                  ${this.loadedPlayList}
                                </tbody>
                              </table>
                          </div>
                          <ul class='aggregate-lyric a-c-hide' >
                            <li></li>
                          </ul>
                          <div class='aggregate-media a-c-hide' >
                              <canvas>

                              </canvas>
                          </div>
                        </div>
                        <div class="aggregate-main">
                          <div class="aggregate-main-top a-c-flex">
                            <img src="//y.gtimg.cn/mediastyle/yqq/extra/player_cover.png?max_age=31536000" />
                            <div>
                              <h3 class="a-c-text">Music</h3>
                              <span class="a-c-text">...</span>
                            </div>
                          </div>
                          <div class="aggregate-main-center a-c-flex">
                            <span>00:00</span>
                            <div class="aggregate-progress-box">
                              <div class="aggregate-progress-block"></div>
                            </div>
                            <span>00:00</span>
                          </div>
                          <div class="aggregate-main-bottom a-c-flex">
                            <div class="a-c-flex">
                              <div class="player-prev a-c-trs"> <i class="iconfont">&#xe782;</i></div>
                              <div class="player-toggle a-c-trs"><i class="iconfont">&#xe630;</i></div>
                              <div class="player-next a-c-trs"><i class="iconfont">&#xe603;</i></div>
                              <div class="player-mode a-c-trs"><i class="iconfont">${`&#xe60${setting.mode};`}</i></div>
                            </div>
                            <div class="a-c-flex">
                              <div class="song-list a-c-trs">
                                <i class="iconfont" style="font-size: 30px">&#xe6af;</i>
                              </div>
                              ${
                                setting.mediaShow
                                  ? `<div class='toggle-media'>
                                <i class="iconfont" style="font-size: 23px">&#xe69a;</i>
                              </div>`
                                  : ''
                              }
                                ${
                                  setting.lyricShow
                                    ? `<div class='toggle-lyric'>
                                <i class="iconfont" style="font-size: 30px">&#xe637;</i>
                              </div>`
                                    : ''
                                }
                              
                            </div>
                          </div>
                        </div>`

      document.body.appendChild(playerRun)
      document.body.appendChild(playerMain)
    }
  }
  try {
    var playerInfo = await request(domain + '/play/player?a=find&uuid=' + uuid),
      { setting, domains, loadedPlayList, name } = playerInfo.data
    setting = JSON.parse(setting)
    domains = JSON.parse(domains)
    loadedPlayList = JSON.parse(loadedPlayList)
    if (!setting.welcome) throw Error()
    setTimeout(() => {
      const notice = new Notice(setting.welcome)
      const player = new Player(notice)
    }, setting.interval * 1000)
  } catch (err) {
    new Notice('初始化失败,F12打开控制台查看')
  }
})()
