/*
 * @Author: your name
 * @Date: 2020-09-18 09:11:23
 * @LastEditTime: 2020-10-13 14:38:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\service\role.js
 */
const egg = require('egg')

class roleService extends egg.Service {
  async list() {
    let { ctx, app } = this,
      { page, num } = ctx.query

    let res = await app.mysql.select('role', {
        limit: +num || 5,
        offset: !page ? 0 : page * +num || 5
      }),
      count = await app.mysql.count('role')

    return {
      count,
      data: res
    }
  }

  async add() {
    let { ctx, app } = this
    ctx.validate({
      rolename: {
        type: 'string',
        max: 20
      },
      roledesc: {
        type: 'string'
      },
      permissions: {
        type: 'permissions'
      }
    })
    let res = await app.mysql.insert('role', { ...ctx.request.body })
    if (res.affectedRows) {
      ctx.helper.ReturnSuccessCode(200, '角色添加成功')
    } else {
      ctx.helper.ReturnErrorCode(403, '角色添加失败')
    }
  }

  async getCommonRules() {
    let { app } = this,
      { CommonRules } = app.config
    return CommonRules
  }

  async delete() {
    let { ctx, app } = this
    ctx.validate({
      rolename: {
        type: 'string',
        max: 20
      }
    })
    let { rolename } = ctx.request.body
    let conn = await app.mysql.beginTransaction()
    try {
      await conn.query(`UPDATE users SET role = ? WHERE role = ?`, ['normlize', rolename])
      let res = await conn.delete('role', {
        rolename
      })
      if (res.affectedRows) {
        await conn.commit()
        ctx.helper.ReturnSuccessCode(200, '角色删除成功')
      }
    } catch (error) {
      await conn.rollback()
      ctx.helper.ReturnErrorCode(500, '角色删除失败')
    }
  }

  async update() {
    let { ctx, app } = this,
      { CommonRules } = app.config

    ctx.validate({
      rolename: {
        type: 'string',
        max: 20
      },
      roledesc: {
        type: 'string'
      },
      permissions: {
        type: 'permissions'
      }
    })

    let { rolename } = ctx.request.body
    try {
      let res = await app.mysql.update(
        'role',
        {
          ...ctx.request.body
        },
        { where: { rolename } }
      )
      ctx.helper.ReturnSuccessCode(200, '角色更新成功')
    } catch (error) {
      ctx.helper.ReturnErrorCode(403, '角色更新失败')
    }
  }
  async verify(role) {
    let { ctx, app } = this
    let { permissions } = await app.mysql.get('role', { rolename: role })
    switch (ctx.params.platform) {
      case 'playlist':
        let playlist = await app.mysql.select('playlist', { username })

        if (playlist.length >= permissions.playlistCount)
          ctx.helper.ReturnErrorCode(403, '歌单数已达到最大值')
        break

      case 'player':
        let players = await app.mysql.select('player', { username })
        if (players.length >= permissions.playerCount)
          ctx.helper.ReturnErrorCode(403, '播放器数已达到最大值')
        break
      default:
        break
    }

    // if (players.length >= permissions.playerCount) {

    // }

    permissions = JSON.parse(permissions)
  }
}
module.exports = roleService
