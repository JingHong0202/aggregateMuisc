/*
 * @Author: your name
 * @Date: 2020-07-12 21:30:25
 * @LastEditTime: 2020-09-27 14:44:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\service\user.js
 */

const egg = require('egg')

class userService extends egg.Service {
  async list() {
    let { app, ctx } = this,
      { page, wd, num } = ctx.query
    let like = wd ? ` WHERE username LIKE '%${wd}%' || email LIKE '%${wd}%' ` : '',
      sql = `SELECT username,state,email,lastTime,role FROM users ${like} LIMIT ${
        !page ? 0 : page * +num || 5
      },${+num || 5}`
    let res = await app.mysql.query(sql)
    // let res = await app.mysql.select('users', {
    //   columns: ['username', 'state', 'email', 'lastTime', 'role'],
    //   limit: +num || 5,
    //   offset: !page ? 0 : page * +num || 5
    // })
    let count = (await this.count(like))[0].count
    let sumRole = (await this.sumRole())[0]

    return {
      count,
      sumRole,
      data: res
    }
  }
  async add() {
    let { ctx } = this
    try {
      ctx.validate({
        username: {
          type: 'string',
          min: 6,
          max: 12
        },
        email: 'email',
        password: 'password',
        state: 'string',
        role: 'string'
      })
    } catch (error) {
      ctx.helper.ReturnErrorCode(400)
    }
    let { username, password, email } = ctx.request.body
    let res = await ctx.service.admin.registry(username, password, email)
    if (res.state) {
      ctx.helper.ReturnSuccessCode(200, res.msg)
    } else {
      ctx.helper.ReturnErrorCode(403, res.msg)
    }
  }
  async update() {
    let { app, ctx } = this
    try {
      ctx.validate(
        {
          username: {
            max: 12,
            min: 6,
            type: 'string'
          }
        },
        ctx.query
      )
    } catch (error) {
      ctx.helper.ReturnErrorCode(400)
    }
    let res = await app.mysql.update(
      'users',
      {
        ...ctx.request.body,
        state: ctx.request.body.state ? '1' : '0'
      },
      {
        where: {
          username: ctx.query.username
        }
      }
    )
    return res.affectedRows === 1
      ? ctx.helper.ReturnSuccessCode(200, '修改成功')
      : ctx.helper.ReturnErrorCode(403, '修改失败,请检查参数')
  }
  async delete() {
    let { app, ctx } = this

    try {
      ctx.validate({
        username: {
          type: 'string',
          min: 6,
          max: 12
        },
        email: 'email'
      })
    } catch (error) {
      ctx.helper.ReturnErrorCode(400)
    }
    let { username, email } = ctx.request.body
    let res = await app.mysql.delete('users', {
      username,
      email
    })
    return res.affectedRows === 1
      ? ctx.helper.ReturnSuccessCode(200, '删除成功')
      : ctx.helper.ReturnErrorCode(403, '删除失败')
  }

  async count(like) {
    let { app } = this
    return await app.mysql.query('SELECT count(*) as count FROM users ' + like)
  }
  async sumRole() {
    let { app } = this
    let roles = await app.mysql.select('role')
    roles = roles.map(item => {
      return `sum(case when role='${item.rolename}' then 1 end) as ${item.rolename} `
    })
    let sql = `SELECT ${roles} from users`
    return await app.mysql.query(sql)
  }
}

module.exports = userService
