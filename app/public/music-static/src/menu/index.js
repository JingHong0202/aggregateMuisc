/*
 * @Author: your name
 * @Date: 2020-06-29 18:45:15
 * @LastEditTime: 2020-09-17 19:23:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\menu\index.js
 */

import { uniqueId } from "lodash";
// import util from "@/libs/util.js";

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath(menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId("d2-menu-empty-"),
    ...(e.children
      ? {
        children: supplementPath(e.children)
      }
      : {})
  }));
}

export const menuHeader = supplementPath([
  { path: "/index", title: "首页", icon: "home" },
  {
    title: "运行日志",
    icon: "desktop",
    path: "/monitoring",
    role: ["admin"]
  }
]);

export const menuAside = supplementPath([
  { path: "/index", title: "首页", icon: "home" },
  {
    title: "用户管理",
    icon: "user",
    role: ["admin"],
    children: [
      { path: "/user-list", title: "用户列表", icon: "users" },
      {
        path: "/user-role",
        title: "角色管理",
        icon: "address-card"
      }
    ]
  },
  {
    title: "歌单管理",
    icon: "sitemap"
  },
  {
    title: "播放器设置",
    icon: "play-circle-o"
  }
]);

export function hasPermission(menu, role) {
  return menu.filter(item => {
    if (!item.role) return true;
    return item.role.indexOf(role) >= 0;
  });
}
