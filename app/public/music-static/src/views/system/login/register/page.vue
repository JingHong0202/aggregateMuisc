<template>
  <div class="page-login--content-main" flex="dir:top main:center cross:center">
    <!-- logo -->
    <!-- <img class="page-login--logo" src="./image/logo@2x.png" /> -->
    <img class="page-login--logo" src="../image/logo@2x.png" />
    <h3>注册页面</h3>
    <!-- form -->
    <div class="page-login--form">
      <el-card shadow="never">
        <el-form
          ref="registerForm"
          label-position="top"
          :rules="rules"
          :model="formRegister"
          size="default"
          status-icon
        >
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="formRegister.username"
              placeholder="用户名"
            >
              <i slot="prepend" class="fa fa-user-circle-o"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="formRegister.password"
              placeholder="密码"
            >
              <i slot="prepend" class="fa fa-keyboard-o"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              type="password"
              v-model="formRegister.repassword"
              placeholder="确认密码"
            >
              <i slot="prepend" class="fa fa-keyboard-o"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              type="text"
              v-model="formRegister.email"
              placeholder="邮箱"
            >
              <i slot="prepend" class="fa fa-envelope" aria-hidden="true"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              type="text"
              v-model="formRegister.code"
              placeholder="验证码"
            >
              <template slot="append">
                <img
                  class="login-code"
                  src="/captcha"
                  @click="refreshCaptcha"
                  ref="code"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-button
            size="default"
            @click="submit"
            type="primary"
            class="button-login"
          >
            注册
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
// import { request } from "@/api";
export default {
  mixins: [PageUtil, refresh],
  activated() {
    this.refreshCaptcha();
  },
  data() {
    return {
      // 表单
      formRegister: {
        username: "",
        password: "",
        repassword: "",
        code: "",
        email: ""
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名,长度最小6位",
            trigger: "blur",
            min: 6,
            max: 12
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
            max: 12,
            min: 4
          }
        ],
        repassword: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.formRegister.password) {
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
            validator: (rule, value, callback) => {
              if (value === "" || !value) callback(new Error("请输入验证码"));
              else if (isNaN(value)) {
                callback(new Error("请输入有效的验证码"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        email: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入邮箱"));
              } else if (
                !/^[0-9a-zA-Z]+[@][0-9a-zA-Z]+([.][a-zA-Z]+){1,2}$/.test(value)
              ) {
                callback(new Error("请输入正确的邮箱"));
              } else {
                callback();
              }
            },
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
    submit() {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          const res = await this.$api.SYS_USER_REGISTRY(this.formRegister);
          this.restField(this.formRegister);
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
