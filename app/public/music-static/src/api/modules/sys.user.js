/*
 * @Author: your name
 * @Date: 2020-06-29 18:45:13
 * @LastEditTime: 2020-10-20 16:09:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\api\modules\sys.user.js
 */

// import { find, assign } from "lodash";

// const users = [
//   { username: "admin", password: "admin", uuid: "admin-uuid", name: "Admin" },
//   {
//     username: "editor",
//     password: "editor",
//     uuid: "editor-uuid",
//     name: "Editor"
//   },
//   { username: "user1", password: "user1", uuid: "user1-uuid", name: "User1" }
// ];

export default ({ service, request, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN(data = {}) {
    return request({
      url: "/login",
      method: "POST",
      data
    });
  },

  /**
   * @description: 注册
   * @param {Object} data 注册信息
   */

  SYS_USER_REGISTRY(data = {}) {
    return request({
      url: "/registry",
      method: "POST",
      data
    });
  },

  /**
   * @description: 获取用户列表
   * @param {number} page 页码
   * @param {number} num 每页数据量
   * @param {number} wd 搜索词
   */

  SYS_USER_LIST(page = "", num = "", wd = "") {
    return request({
      url: "/admin.user?a=list&page=" + page + "&num=" + num + "&wd=" + wd,
      method: "GET"
    });
  },

  /**
   * @description: 编辑用户信息
   * @param {Object} data 编辑信息
   * @param {Object} option id
   */

  SYS_USER_EDIT(data = {}, option = {}) {
    return request({
      url: "/admin.user?a=update" + "&username=" + option.username,
      method: "POST",
      data
    });
  },

  SYS_USER_FORGET(data) {
    return request({
      url: "/forget",
      method: "POST",
      data
    });
  },
  SYS_USER_FORGET_UPDATE(email, captcha, data) {
    return request({
      url: "/ForgetPassWord/" + email + "?a=ForgetPassWord&captcha=" + captcha,
      method: "POST",
      data
    });
  },
  /**
   * @description: 删除用户信息
   * @param {username}  id
   * @param {email}   id2
   */
  SYS_USER_DELETE(username, email) {
    return request({
      url: "admin.user?a=delete",
      method: "POST",
      data: {
        username,
        email
      }
    });
  },

  /**
   * @description: 添加用户
   * @param {data} 注册信息
   */

  SYS_USER_ADD(data = {}) {
    return request({
      url: "admin.user?a=add",
      method: "POST",
      data
    });
  }
});
