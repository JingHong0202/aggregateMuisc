/*
 * @Author: your name
 * @Date: 2020-06-29 18:24:47
 * @LastEditTime: 2020-09-15 16:41:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\config\plugin.js
 */
module.exports = {
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  cache: {
    enable: true,
    package: 'egg-cache'
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  mailer: {
    enable: true,
    package: 'egg-mailer'
  },
  ejs: {
    enable: true,
    package: 'egg-view-ejs'
  }
}
