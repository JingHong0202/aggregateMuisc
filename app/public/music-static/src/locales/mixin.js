/*
 * @Author: your name
 * @Date: 2020-06-29 18:45:15
 * @LastEditTime: 2020-10-21 15:53:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\locales\mixin.js
 */

export default {
  methods: {
    onChangeLocale(command) {
      this.$i18n.locale = command;
      let message = `当前语言：${this.$t("_name")} [ ${this.$i18n.locale} ]`;
      if (process.env.VUE_APP_BUILD_MODE === "PREVIEW") {
        message = [
          `当前语言：${this.$t("_name")} [ ${this.$i18n.locale} ]`,
          "仅提供切换功能，没有配置具体的语言数据 ",
          '文档参考：<a class="el-link el-link--primary is-underline" target="_blank" href="https://d2.pub/zh/doc/d2-admin/locales">《国际化 | D2Admin》</a>'
        ].join("<br/>");
      }
      this.$notify({
        title: "语言变更",
        dangerouslyUseHTMLString: true,
        message
      });
    }
  }
};

export const refresh = {
  methods: {
    refreshCaptcha(evnet, codeName = "code") {
      this.$refs[codeName].src = `/captcha?${Math.random()}`;
    }
  }
};

export const PageUtil = {
  methods: {
    toPage(str) {
      this.$emit("toPage", str);
      if (/&?captcha=.*&?/.test(window.location.href)) {
        window.history.pushState(
          {},
          0,
          window.location.href.replace(/&?captcha=.*&?/, "")
        );
        window.history.pushState(
          {},
          0,
          window.location.href.replace(/&?email=.*&?/, "")
        );
      }
      this.$route.query.captcha = "";
      this.$route.query.email = "";
    },
    restField(obj) {
      return Object.keys(obj).forEach(item => {
        obj[item] = "";
      });
    }
  }
};
