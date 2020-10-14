/*
 * @Author: your name
 * @Date: 2020-09-18 09:43:49
 * @LastEditTime: 2020-09-27 14:04:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\api\modules\sys.role.js
 */
export default ({ service, request, faker, tools }) => ({
  /**
   * @description:
   * @param {type}
   * @return {type}
   */
  SYS_ROLE_LIST(page = "", num = "") {
    return request({
      url: "/admin.role?a=list&page=" + page + "&num=" + num,
      method: "GET"
    });
  },
  SYS_ROLE_COMMON_RULES() {
    return request({
      url: "/admin.role?a=getCommonRules",
      method: "GET"
    });
  },
  SYS_ROLE_UPDATE_RULES(data) {
    return request({
      url: "/admin.role?a=update",
      method: "POST",
      data
    });
  },
  SYS_ROLE_DELETE_RULES(rolename) {
    return request({
      url: "/admin.role?a=delete",
      method: "POST",
      data: {
        rolename
      }
    });
  },
  SYS_ROLE_ADD_RULES(data) {
    return request({
      url: "/admin.role?a=add",
      method: "POST",
      data
    });
  }
});
