/*
 * @Author: your name
 * @Date: 2020-06-29 18:24:47
 * @LastEditTime: 2020-11-29 17:57:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\config\config.default.js
 */

const path = require('path'),
  fsStore = require('cache-manager-fs-hash')

module.exports = appInfo => {
  // 角色权限 --- 最大数限制
  let CommonRules = {
    playMaxCount: 3,
    playlistMaxCount: 10,
    songlistMaxCount: 200,
    domainMaxCount: 5
  }
  return {
    proxy: true,
    logger: {
      outputJSON: true
    },
    validate: {
      convert: true
    },
    session: {
      key: 'EGG_SESS',
      maxAge: 3 * 3600 * 1000, // 1 天
      httpOnly: true,
      encrypt: true
    },
    // email options
    mailer: {
      host: 'smtp.qq.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'jinghong0202@foxmail.com',
        pass: 'ldtzztisztcrbajc'
      }
    },
    CommonRules,
    static: {
      prefix: '/',
      dir: [
        path.join(appInfo.baseDir, 'app/public'),
        path.join(appInfo.baseDir, 'app/public/dist')
      ],
      dynamic: true,
      preload: true,
      maxAge: 86400,
      buffer: true
    },
    gzip: {
      threshold: 1024
    },
    isAdmin: {
      roles: ['admin']
    },
    middleware: ['error'],
    cache: {
      default: 'fsStore',
      stores: {
        fsStore: {
          driver: fsStore,
          options: {
            path: 'cache', //缓存文件的路径
            ttl: 60 * 60, //生存时间（以秒为单位）
            zip: true //压缩文件以节省磁盘空间（默认值：false）
          }
        }
      }
    }
  }
}
