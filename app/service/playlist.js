/*
 * @Author: your name
 * @Date: 2020-07-18 10:36:18
 * @LastEditTime: 2020-10-13 14:46:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\service\playlist.js
 */

const egg = require('egg')

class playlistService extends egg.Service {
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
    let rules = await ctx.service.tools.verifyPlay(username, 'playlistCount')
    if (list.length + 1 > rules)
      ctx.helper.ReturnErrorCode(403, '创建失败，当前用户只能创建' + rules + '个歌单')

    let uuid = ctx.service.tools.randomUUid()

    try {
      var result = await app.mysql.insert('playlist', {
        username,
        name,
        uuid
      })
      ctx.helper.ReturnSuccessCode(200, '歌单添加成功', { uuid })
    } catch (error) {
      ctx.helper.ReturnErrorCode(
        403,
        '歌单添加失败' + (error.code === 'ER_DUP_ENTRY' ? ',歌单名称重复' : '')
      )
    }
  }
  async delete() {
    let { ctx, app } = this,
      { uuid, username } = ctx.request.body
    try {
      ctx.validate({
        uuid: {
          type: 'string'
        }
      })
    } catch (error) {
      ctx.helper.ReturnErrorCode(400)
    }
    let conn = await app.mysql.beginTransaction()
    try {
      let res = await conn.delete('playlist', {
        uuid
      })
      await ctx.service.tools.playListFile(uuid, username, { isDel: true })

      if (res.affectedRows) {
        await conn.commit()
        ctx.helper.ReturnSuccessCode(200, '歌单删除成功')
      } else {
        new Error('歌单删除失败')
      }
    } catch (error) {
      await conn.rollback()
      ctx.helper.ReturnErrorCode(403, error)
    }
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

    let { name, desc, playlist } = ctx.request.body
    let rules = await ctx.service.tools.verifyPlay(username, 'songlistCount')
    if (JSON.parse(playlist).length > rules) ctx.helper.ReturnErrorCode(403, '歌曲列表超过最大数')
    let conn = await app.mysql.beginTransaction()
    try {
      let updateRes = await conn.update(
        'playlist',
        {
          name,
          desc
        },
        {
          where: { uuid }
        }
      )
      await ctx.service.tools.playListFile(uuid, username, { content: playlist })
      if (updateRes.affectedRows) {
        await conn.commit()
        ctx.helper.ReturnSuccessCode(200, '歌单更新成功')
      } else {
        new Error('歌单更新失败')
      }
    } catch (error) {
      await conn.rollback()
      ctx.helper.ReturnErrorCode(403, error)
    }
  }
  async find() {
    let { ctx, app } = this
    let { username, uuid } = ctx.query,
      res = null
    if (username) {
      res = await app.mysql.select('playlist', {
        where: { username },
        columns: ['name', 'uuid']
      })
    } else if (uuid) {
      let { username, name, desc } = await app.mysql.get('playlist', {
        uuid
      })
      res = {
        name,
        desc,
        playlist: await ctx.service.tools.playListFile(uuid, username)
      }
    }
    return res
  }
}

module.exports = playlistService
