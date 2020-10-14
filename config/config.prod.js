const path = require('path')

module.exports = appInfo => {
  return {
    keys: 'jinghong-music',
    security: {
      csrf: {
        enable: false
      },
      xframe: {
        enable: false
      }
    },
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'xuyuxin',
        database: ''
      },
      app: true
    },
    cors: {
      enable: true,
      package: 'egg-cors',
      origin: '*',
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
