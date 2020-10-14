/*
 * @Author: your name
 * @Date: 2020-06-29 18:24:47
 * @LastEditTime: 2020-10-09 10:46:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music\app\router.js
 */

module.exports = app => {
  const { router, controller } = app
  router
    .all(/api\/(.*)/, app.middleware.cache(), controller.api.run)

    // admin
    .post('/login', controller.admin.login)
    .post('/registry', controller.admin.registry)

    // verify
    .get('/captcha', controller.verify.captcha)
    .get('/userActive/:email', controller.verify.active)

    // dashboard
    .all('/admin.user', app.middleware.access(), controller.admin.user)
    .all('/admin.role', app.middleware.access(), controller.admin.role)
    // .post('/admin.user', controller.admin.user)
    .get('/admin.dashboard', app.middleware.access(), controller.admin.dashboard)
    .get('/admin.words', app.middleware.access(), controller.admin.words)
    .get('/admin.logs', app.middleware.access(), controller.admin.logs)

    // play
    .all('/play/:platform', controller.play.run)
    // .get('/play/:platform', controller.play.run)
    .get('/', controller.admin.run)
}
