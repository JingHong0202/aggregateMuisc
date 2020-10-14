import layoutHeaderAside from "@/layout/header-aside";

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require("@/libs/util.import." + process.env.NODE_ENV);

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: "/",
    redirect: { name: "index" },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: "index",
        name: "index",
        meta: {
          auth: true
        },
        component: _import("system/index")
      },
      {
        path: "/user-list",
        name: "user-list",
        meta: {
          title: "用户管理",
          auth: true,
          role: ["admin"]
        },
        component: _import("user/user-list")
      },
      {
        path: "/user-role",
        name: "user-role",
        meta: {
          title: "角色管理",
          auth: true,
          role: ["admin"]
        },
        component: _import("user/user-role")
        // children: [
        //   {
        //     path: "/detail-role",
        //     name: "detail-role",
        //     component: _import("user/detail-role"),
        //     meta: { title: "角色详情信息", auth: true, role: ["admin"] }
        //   }
        // ]
      },
      {
        name: "playlist",
        path: "/playlist/:id",
        meta: {
          title: "歌单管理",
          auth: true
        },
        component: _import("play/playlist")
      },
      {
        name: "player",
        path: "/player/:id",
        meta: {
          title: "播放器设置",
          auth: true
        },
        component: _import("play/player")
      },
      // 系统监控
      {
        path: "/monitoring",
        name: "monitoring",
        meta: {
          title: "运行日志",
          auth: true,
          role: ["admin"]
        },
        component: _import("host/Monitoring")
      },
      // 系统 前端日志
      {
        path: "log",
        name: "log",
        meta: {
          title: "前端日志",
          auth: true
        },
        component: _import("system/log")
      },
      // 刷新页面 必须保留
      {
        path: "refresh",
        name: "refresh",
        hidden: true,
        component: _import("system/function/refresh")
      },
      // 页面重定向 必须保留
      {
        path: "redirect/:route*",
        name: "redirect",
        hidden: true,
        component: _import("system/function/redirect")
      }
    ]
  }
];

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: "/login",
    name: "login",
    component: _import("system/login")
  }
];

/**
 * 错误页面
 */
const errorPage = [
  {
    path: "*",
    name: "404",
    component: _import("system/error/404")
  }
];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage];
