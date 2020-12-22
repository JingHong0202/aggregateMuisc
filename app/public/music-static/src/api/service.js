/*
 * @Author: your name
 * @Date: 2020-06-29 18:45:13
 * @LastEditTime: 2020-12-08 13:54:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\api\service.js
 */

import axios from "axios";
// import Adapter from "axios-mock-adapter";
import { get } from "lodash";
import util from "@/libs/util";
import { Message, MessageBox } from "element-ui";
import { errorLog, errorCreate } from "./tools";

/**
 * @description 创建请求实例
 */
function createService() {
  // 创建一个 axios 实例
  const service = axios.create();
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    (error) => {
      // 发送失败
      console.log(error);
      return Promise.reject(error);
    }
  );
  // 响应拦截
  service.interceptors.response.use(
    (response) => {
      // dataAxios 是 axios 返回数据中的 data
      // // 这个状态码是和后端约定的
      // const { code } = dataAxios;
      // // 根据 code 进行判断
      // if (code === undefined) {
      //   // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      //   return dataAxios;
      // } else {
      //   // 有 code 代表这是一个后端接口 可以进行进一步的判断
      //   switch (code) {
      //     case "200":
      //       // [ 示例 ] code === 0 代表没有错误
      //       return dataAxios.data;
      //     default:
      //       // 不是正确的 code
      //       errorCreate(`${dataAxios.msg}: ${response.config.url}`);
      //       break;
      //   }
      // }
      if (response.status < 400 && response.data.msg) {
        Message.success({ message: response.data.msg, type: "success" });
      }
      return response.data;
    },
    (error) => {
      if (error.response.status === 401) {
        util.cookies.remove("token");
        util.cookies.remove("uuid");
        CustomMessage().then(() => {
          window.location.reload();
        });
        return;
      }
      const { msg } = error.response.data;
      // const status = get(error, "response.status");
      error.message = msg;
      errorLog(error);
      return Promise.reject(error);
    }
  );
  return service;
}

function CustomMessage() {
  return new Promise((resolve, reject) => {
    Message.error({
      message: "登录状态失效,请重新登录",
      type: "error",
    });
    setTimeout(() => {
      resolve();
    }, 2500);
  });
}

/**
 * @description 创建请求方法
 * @param {Object} service axios 实例
 */
function createRequestFunction(service) {
  return function (config) {
    const token = util.cookies.get("token");
    const configDefault = {
      headers: {
        Authorization: token,
        "Content-Type": get(config, "headers.Content-Type", "application/json"),
      },
      withCredentials: true,
      timeout: 15000,
      baseURL: process.env.VUE_APP_API,
      data: {},
    };
    return service(Object.assign(configDefault, config));
  };
}

// 用于真实网络请求的实例和请求方法
export const service = createService();
export const request = createRequestFunction(service);

// 用于模拟网络请求的实例和请求方法
// export const serviceForMock = createService();
// export const requestForMock = createRequestFunction(serviceForMock);

// 网络请求数据模拟工具
// export const mock = new Adapter(serviceForMock);
