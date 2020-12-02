/*
 * @Author: your name
 * @Date: 2020-07-17 22:21:02
 * @LastEditTime: 2020-12-01 09:08:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\api\modules\sys.play.js
 */

export default ({ service, request, faker, tools }) => ({
  /**
   * @description: 获取当前登录用户歌单
   * @param {String}  id 用户标识符
   */

  SYS_PLAYLIST_FIND(id) {
    if (!id) return false;
    return request({
      url: "/play/playlist?a=find&uuid=" + id,
      method: "GET"
    });
  },
  /**
   * @description: 获取当前登录用户播放器
   * @param {String}  id 用户标识符
   */

  SYS_PLAYER_FIND(id) {
    return request({
      url: "/play/player?a=find&uuid=" + id,
      method: "GET"
    });
  },

  /**
   * @description: 获取歌单/播放器 子菜单
   * @param {String}  name 用户标识符
   */

  SYS_PLAY_COMM_FIND(name) {
    return request({
      url: "/play/playfind?a=find&username=" + name,
      method: "GET"
    });
  },
  /**
   * @description: 添加歌单
   * @param {Object} data 添加歌单信息
   */

  SYS_PLAYLIST_ADD(data = {}) {
    return request({
      url: "/play/playlist?a=init",
      data,
      method: "POST"
    });
  },
  /**
   * @description: 添加播放器
   * @param {Object} data 添加歌单信息
   */

  SYS_PLAYER_ADD(data = {}) {
    return request({
      url: "/play/player?a=init",
      data,
      method: "POST"
    });
  },

  /**
   * @description:  删除歌单
   * @param {String} id 唯一标识符
   * @param {String} name  歌单名称
   * @return:
   */

  SYS_PLAYLIST_DEL(id, name) {
    return request({
      url: "/play/playlist?a=delete",
      method: "POST",
      data: {
        uuid: id,
        username: name
      }
    });
  },
  /**
   * @description: 搜索歌曲
   * @param {Object} option 各种参数
   * @return:
   */
  SYS_PLAYLIST_SEARCH(option = {}) {
    return request({
      url: `/api/${option.platform}?mode=${option.mode}&a=${
        option.action
      }&p=${option.page || 1}${option.limit ? `&n=${option.limit}` : ""}`,
      method: "GET"
      // headers: {
      //   uuid: option.uuid
      // }
    });
  },
  /**
   * @description:  根据歌单ID获取列表
   * @param {Object} option 各种参数
   * @return:
   */

  SYS_PLAYLIST_LIST(option = {}) {
    return request({
      url: `/api/${option.platform}?mode=${option.mode}&a=${option.action}`,
      method: "GET"
      // headers: {
      //   uuid: option.uuid
      // }
    });
  },
  /**
   * @description: 更新播放器
   * @param {String}  id 唯一标识符
   * @param {String}  username 用户名
   * @param {Object}  data 更新资料
   * @return:
   */

  SYS_PLAYER_UPDATE(id, username, data) {
    return request({
      url: `/play/player?a=update&uuid=${id}&username=${username}`,
      method: "POST",
      data
    });
  },

  /**
   * @description:  更新歌单
   * @param {String}  id 唯一标识符
   * @param {String}  username 用户名
   * @param {Object}  data 更新资料
   */

  SYS_PLAYLIST_UPDATE(id, username, data) {
    return request({
      url: "/play/playlist?a=update&uuid=" + id + "&username=" + username,
      method: "POST",
      data
    });
  },

  /**
   * @description:
   * @param {type}
   * @return:
   */
  SYS_PLAY_RANK() {
    return request({
      url: "/play/playrank",
      method: "GET"
    });
  },

  /**
   * @description:
   * @param {type}
   * @return:
   */
  SYS_PLAY_DEL(uuid) {
    return request({
      url: "/play/player?a=del",
      method: "POST",
      data: { uuid }
    });
  }
});
