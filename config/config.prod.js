/*
 * @Author: your name
 * @Date: 2020-06-29 18:24:47
 * @LastEditTime: 2020-11-22 10:32:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\config\config.prod.js
 */
// const path = require('path')

module.exports = appInfo => {
  return {
    staticDomain: 'http://localhost:8080',
    domain: '',
    keys: 'aggregateMusic',
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true
      },
      xframe: {
        enable: false
      },
      domainWhiteList: ['*']
    },
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'xuyuxin',
        database: 'aggregatemusic'
      },
      app: true
    },
    cors: {
      // origin: '*',
      allowMehtods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH',
      credentials: true
    },
    cluster: {
      listen: {
        port: 7001,
        hostname: '0.0.0.0'
      }
    }
  }
}
