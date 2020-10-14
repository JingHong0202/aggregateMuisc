/*
 * @Author: your name
 * @Date: 2020-07-07 22:18:34
 * @LastEditTime: 2020-09-23 17:14:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app.js
 */
class CustomApp {
  constructor(app) {
    this.app = app
  }
  willReady() {
    this.app.validator.addRule('repassword', (rule, value) => {
      if (value !== rule.password) {
        return '两次密码不一致,请重试'
      }
    })
    this.app.validator.addRule('isJSON', (rule, value) => {
      try {
        JSON.parse(value)
      } catch (error) {
        return '不是标准JSON！'
      }
    })
    this.app.validator.addRule('permissions', (rule, value) => {
      let obj
      try {
        obj = JSON.parse(value)
      } catch (error) {
        return '不是标准JSON！'
      }
      let { playerCount, playlistCount, songlistCount,domainCount } = obj
      if (songlistCount > rule.songlistCount) {
        return '歌曲数量超过最大值'
      }
      if (playerCount > rule.playerCount) {
        return '播放器数量超过最大值'
      }
      if (playlistCount > rule.playlistCount) {
        return '歌单数量超过最大值'
      }
      if (domainCount > rule.maxDomain) {
        return '域名绑定数量超过最大值'
      }
    })
  }
}
module.exports = CustomApp
