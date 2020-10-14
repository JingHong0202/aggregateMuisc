/*
 * @Author: your name
 * @Date: 2020-06-29 18:45:15
 * @LastEditTime: 2020-07-26 11:15:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\router\index.js
 */

import Vue from "vue";
import VueRouter from "vue-router";

// 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import store from "@/store/index";
import util from "@/libs/util.js";

import { menuHeader, menuAside, hasPermission } from "@/menu";

// 路由数据
import routes from "./routes";

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch(err => err);
};
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return VueRouterReplace.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
});

async function addMenu(menu, name) {
  let list = await Vue.prototype.$api["SYS_PLAY_COMM_FIND"](name),
    playlist = menu.find(item => item.title === "歌单管理"),
    player = menu.find(item => item.title === "播放器设置");
  Vue.prototype.$playlist = list.data.playlist;
  playlist.children = list.data.playlist.map(item => {
    return {
      path: "/playlist/" + item.uuid,
      title: item.name,
      icon: "window-restore"
    };
  });
  player.children = list.data.player.map(item => {
    return {
      path: "/player/" + item.uuid,
      title: item.name,
      icon: "window-restore"
    };
  });
}

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
  await store.dispatch("d2admin/page/isLoaded");
  // 确认已经加载组件尺寸设置 https://github.com/d2-projects/d2-admin/issues/198
  await store.dispatch("d2admin/size/isLoaded");
  // 进度条
  NProgress.start();
  let { role, name } = store.state.d2admin.user.info;
  // 获取 播放器\歌单 子菜单
  await addMenu(menuAside, name);
  // 关闭搜索面板
  store.commit("d2admin/search/set", false);
  // 设置顶栏菜单
  store.commit("d2admin/menu/headerSet", hasPermission(menuHeader, role));
  // 设置侧边栏菜单
  store.commit("d2admin/menu/asideSet", hasPermission(menuAside, role));
  // 初始化菜单搜索功能
  store.commit(
    "d2admin/search/init",
    hasPermission(menuHeader.concat(menuAside.slice(1)), role)
  );
  // console.log(store);
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some(r => r.meta.auth)) {
    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
    // 请根据自身业务需要修改
    const token = util.cookies.get("token");
    if (token && token !== "undefined") {
      if (!to.meta.role || to.meta.role.indexOf(role) >= 0) {
        next();
      } else {
        next({
          name: "404"
        });
      }
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: "login",
        query: {
          redirect: to.fullPath
        }
      });
      // https://github.com/d2-projects/d2-admin/issues/138
      NProgress.done();
    }
  } else {
    // 不需要身份校验 直接通过
    next();
  }
});

router.afterEach(to => {
  // 进度条
  NProgress.done();
  // 多页控制 打开新的页面
  store.dispatch("d2admin/page/open", to);
  // 更改标题
  util.title(to.meta.title);
});

export default router;
