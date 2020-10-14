/*
 * @Author: your name
 * @Date: 2020-07-16 12:16:18
 * @LastEditTime: 2020-09-17 17:26:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\api\modules\sys.dashboard.js
 */

export default ({ service, request, faker, tools }) => ({
  /**
   * @description: 获取首页仪表盘数据
   */

  SYS_DASHBOARD_DATA() {
    return request({
      url: "/admin.dashboard",
      method: "GET"
    });
  },
  /**
   * @description: 获取主机日志
   */

  SYS_LOGS_DATA() {
    return request({
      url: "/admin.logs",
      method: "GET"
    });
  },
  /**
   * @description: 清空日志
   */

  SYS_LOGS_TRUNCATE() {
    return request({
      url: "/admin.logs?a=deleteLogAll",
      method: "GET"
    });
  },

  /**
   * @description: 获取搜索统计数据
   */

  SYS_WORDS_DATA() {
    return request({
      url: "/admin.words",
      method: "GET"
    });
  }
});
