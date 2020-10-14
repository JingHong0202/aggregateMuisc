/*
 * @Author: your name
 * @Date: 2020-07-15 23:02:40
 * @LastEditTime: 2020-07-31 12:51:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\schedule\dashboard.js
 */
const Subscription = require('egg'),
  path = require('path'),
  fs = require('fs')

module.exports = app => {
  return {
    schedule: {
      interval: '1m',
      type: 'worker'
    },
    async task(ctx) {
      let file = path.join(__dirname, '../../data/dashboard.json')
      if (!fs.existsSync(file)) {
        let init = JSON.stringify({ users: {}, playlist: {}, used: {}, domain: {} })
        fs.promises.writeFile(file, init, { flag: 'a+' })
      }
      let state_dashboard = await app.mysql.query(
          'SELECT sum(case when state="0" then 1 end) as state0,sum(case when state="1" then 1 end) as state1 FROM users'
        ),
        playlist_dashboard = await app.mysql.count('playlist'),
        domains_dashboard = await app.mysql.query(
          'SELECT sum(domainCount) as domainCount FROM  player'
        )
      let read = await fs.promises.readFile(file),data

      try {
        data = JSON.parse(read)
      } catch (error) {
        data = { users: {}, playlist: {}, used: {}, domain: {} }
      }

      let  index = new Date().toLocaleDateString(),
        users = data.users,
        playcount = data.playlist,
        domaincount = data.domain
      // used = data.used,
      // domain = data.domain

      if (Object.keys(users).length === 7) {
        delete users[Object.keys(users)[0]]
        users[index] = state_dashboard[0]
      } else {
        users[index] = state_dashboard[0]
      }

      data.users = users

      if (Object.keys(playcount).length === 7) {
        delete playcount[Object.keys(playcount)[0]]
        playcount[index] = playlist_dashboard
      } else {
        playcount[index] = playlist_dashboard
      }

      data.playlist = playcount
      if (Object.keys(domaincount).length === 7) {
        delete domaincount[Object.keys(domaincount)[0]]
        domaincount[index] = domains_dashboard[0].domainCount
      } else {
        domaincount[index] = domains_dashboard[0].domainCount
      }

      data.domain = domaincount

      await fs.promises.writeFile(file, JSON.stringify(data))
    }
  }
}
