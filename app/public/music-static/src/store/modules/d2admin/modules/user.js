/*
 * @Author: your name
 * @Date: 2020-06-29 18:45:16
 * @LastEditTime: 2020-07-12 16:30:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\store\modules\d2admin\modules\user.js
 */

export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {}
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} context
     * @param {*} info info
     */
    async set({ state, dispatch }, info) {
      // store 赋值
      state.info = info;
      // 持久化
      await dispatch(
        "d2admin/db/set",
        {
          dbName: "sys",
          path: "user.info",
          value: info,
          user: true
        },
        { root: true }
      );
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} context
     */
    async load({ state, dispatch }) {
      // store 赋值
      state.info = await dispatch(
        "d2admin/db/get",
        {
          dbName: "sys",
          path: "user.info",
          defaultValue: {},
          user: true
        },
        { root: true }
      );
    }
  }
};
