/*
 * @Author: your name
 * @Date: 2020-07-18 10:36:11
 * @LastEditTime: 2020-10-23 08:54:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\service\player.js
 */

const egg = require('egg')

class playerService extends egg.Service {
  async init() {
    let { ctx, app } = this
    try {
      ctx.validate({
        username: {
          max: 12,
          min: 6,
          type: 'string'
        },
        name: {
          type: 'string',
          max: 20
        }
      })
    } catch (error) {
      ctx.helper.ReturnErrorCode(400)
    }

    let { username, name } = ctx.request.body

    ctx.query.username = username
    let list = await this.find()
    let rules = await ctx.service.tools.verifyPlay(username, 'playerCount')
    if (list.length + 1 > rules)
      ctx.helper.ReturnErrorCode(403, '创建失败，当前用户只能创建' + rules + '个播放器')
    let uuid = ctx.service.tools.randomUUid()

    try {
      var result = await app.mysql.insert('player', {
        username,
        name,
        uuid,
        loadedPlayList: JSON.stringify([]),
        domains: JSON.stringify([]),
        setting: JSON.stringify({
          notice: true,
          autoPlay: true,
          autoshowInterval: 3,
          welcomeShow: true,
          welcome: '欢迎使用聚合音乐',
          volume: 100,
          lyricShow: true,
          mediaShow: true,
          album: '',
          interval: 1,
          // position: 'leftBottom',
          color: '',
          style: '',
          mode: '1'
        })
      })
      ctx.helper.ReturnCustomCode(200, '播放器添加成功', { uuid })
    } catch (error) {
      ctx.helper.ReturnErrorCode(
        403,
        '播放器添加失败' + (error.code === 'ER_DUP_ENTRY' ? ',播放器名称重复' : '')
      )
    }
  }
  async find() {
    let { ctx, app } = this
    let { username, uuid } = ctx.query,
      res = null
    if (username) {
      res = await app.mysql.select('player', {
        where: { username },
        columns: ['name', 'uuid']
      })
    } else if (uuid) {
      res = await app.mysql.get('player', {
        uuid
      })
    }
    return res
  }
  async update() {
    let { ctx, app } = this,
      { uuid, username } = ctx.query
    try {
      ctx.validate(
        {
          uuid: {
            type: 'string'
          }
        },
        ctx.query
      )
    } catch (error) {
      ctx.helper.ReturnErrorCode(400)
    }
    let { setting, loadedPlayList, domains } = ctx.request.body
    let domainCount = domains.length || 0
    let rules = await ctx.service.tools.verifyPlay(username, 'domainCount')
    if (domainCount > rules) {
      ctx.helper.ReturnErrorCode(403, '域名绑定超过最大数')
    }
    try {
      setting = JSON.stringify(setting)
      loadedPlayList = JSON.stringify(loadedPlayList)
      domains = JSON.stringify(domains)
    } catch (error) {
      ctx.helper.ReturnErrorCode(400)
    }
    try {
      let res = await app.mysql.update(
        'player',
        {
          ...ctx.request.body,
          setting,
          loadedPlayList,
          domains,
          domainCount
        },
        { where: { uuid } }
      )
      ctx.helper.ReturnCustomCode(200, '播放器更新成功')
    } catch (error) {
      let message = error.code === 'ER_DUP_ENTRY' ? '名称重复' : ''
      ctx.helper.ReturnErrorCode(403, '播放器更新失败，' + message)
    }
  }
  async del() {
    let { ctx, app } = this,
      { uuid } = ctx.request.body

    try {
      ctx.validate({
        uuid: {
          type: 'string'
        }
      })
    } catch (error) {
      ctx.helper.ReturnErrorCode(400)
    }
    let res = await app.mysql.delete('player', {
      uuid
    })
    if (res.affectedRows) {
      ctx.helper.ReturnCustomCode(200, '播放器删除成功')
    } else {
      ctx.helper.ReturnErrorCode(403, '播放器删除失败')
    }
  }
  async getCode() {
    let { ctx, app } = this
    let content = await ctx.service.tools.readPlayerJS()
    let dashboard = JSON.parse(new Buffer(await ctx.service.tools.ReadDashboard()).toString())
    let { used } = dashboard,
      index = new Date().toLocaleDateString()
    if (Object.keys(used).length === 7) {
      delete used[Object.keys(used)[0]]
      used[index] = 1
    } else {
      if (used[index]) used[index] += 1
      else used[index] = 1
    }

    await ctx.service.tools.WriteDashboard(dashboard)

    ctx.body = content.replace(/<\?--\?>/gi, app.config.domain)
  }
}

module.exports = playerService
