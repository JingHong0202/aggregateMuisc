<template>
  <div class="page-login--content-main" flex="dir:top main:center cross:center">
    <!-- logo -->
    <!-- <img class="page-login--logo" src="./image/logo@2x.png" /> -->
    <img class="page-login--logo" src="../image/logo@2x.png" />
    <h3>密码找回</h3>
    <!-- form -->
    <div class="page-login--form">
      <el-card shadow="never">
        <el-form
          ref="forgetForm"
          label-position="top"
          :rules="rules"
          :model="formForget"
          size="default"
          status-icon
          v-show="!$route.query.captcha"
        >
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="formForget.username"
              placeholder="用户名"
            >
              <i slot="prepend" class="fa fa-user-circle-o"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              type="text"
              v-model="formForget.code"
              placeholder="验证码"
            >
              <template slot="append">
                <img
                  class="login-code"
                  src="/captcha"
                  ref="code"
                  @click="refreshCaptcha"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-button
            size="default"
            @click="sendEmail"
            type="primary"
            class="button-login"
          >
            确认
          </el-button>
        </el-form>
        <el-form
          ref="fogetForm2"
          label-position="top"
          :rules="rules2"
          :model="formForget2"
          size="default"
          status-icon
          v-show="$route.query.captcha"
        >
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="formForget2.password"
              placeholder="请输入新密码"
            >
              <i slot="prepend" class="fa fa-keyboard-o"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              type="password"
              v-model="formForget2.repassword"
              placeholder="请再次输入密码"
            >
              <i slot="prepend" class="fa fa-keyboard-o"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              type="text"
              v-model="formForget2.code"
              placeholder="验证码"
            >
              <template slot="append">
                <img
                  class="login-code"
                  src="/captcha"
                  @click="refreshCaptcha($event, 'code2')"
                  ref="code2"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-button
            size="default"
            @click="submit2"
            type="primary"
            class="button-login"
          >
            确认
          </el-button>
        </el-form>
      </el-card>
      <p class="page-login--options" flex="main:justify cross:center">
        <span @click="toPage('login')"><d2-icon name="arrow-left" /> 返回</span>
      </p>
      <!-- quick login -->
      <!-- <el-button class="page-login--quick" size="default" type="info" @click="dialogVisible = true">
              快速选择用户（测试功能）
            </el-button> -->
    </div>
  </div>
</template>

<script>
import { PageUtil, refresh } from "@/locales/mixin.js";
export default {
  mixins: [PageUtil, refresh],
  activated() {
    this.refreshCaptcha();
  },
  computed: {
    // toggle () {
    //   return this.
    // }
  },
  data() {
    return {
      // 表单
      formForget: {
        username: "",
        code: ""
      },
      formForget2: {
        password: "",
        repassword: "",
        code: ""
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      },
      rules2: {
        password: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          }
        ],
        repassword: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.formForget2.password) {
                callback(new Error("两次输入的密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    /**
     * @description 提交表单
     */
    sendEmail() {
      this.$refs.forgetForm.validate(async valid => {
        if (valid) {
          await this.$api.SYS_USER_FORGET({
            username: this.formForget.username,
            code: this.formForget.code
          });
          this.refreshCaptcha();
          this.restField(formForget);
        } else {
          // 登录表单校验失败
          this.$message.error("表单校验失败，请检查");
        }
      });
    },
    submit2() {
      this.$refs.fogetForm2.validate(async valid => {
        if (valid) {
          const email = window.location.href.match(/&?email=(.*)&?/)[1];
          const captcha = window.location.href.match(/&?captcha=(.*)&?/)[1];

          await this.$api.SYS_USER_FORGET_UPDATE(
            email,
            captcha,
            this.formForget2
          );
          this.refreshCaptcha(this.$event, "code2");
          this.restField(this.formForget2);
          this.toPage("login");
        } else {
          // 登录表单校验失败
          this.$message.error("表单校验失败，请检查");
        }
      });
    }
  }
};
</script>

<style lang="scss"></style>
