<template>
  <!-- form -->
  <div class="page-login--content-main" flex="dir:top main:center cross:center">
    <img class="page-login--logo" src="../image/logo@2x.png" />
    <h3>登录</h3>
    <div class="page-login--form">
      <el-card shadow="never">
        <el-form
          ref="loginForm"
          label-position="top"
          :rules="rules"
          :model="formLogin"
          size="default"
        >
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="formLogin.username"
              placeholder="用户名"
            >
              <i slot="prepend" class="fa fa-user-circle-o"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="formLogin.password"
              placeholder="密码"
            >
              <i slot="prepend" class="fa fa-keyboard-o"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input type="text" v-model="formLogin.code" placeholder="验证码">
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
            登录
          </el-button>
        </el-form>
      </el-card>
      <p class="page-login--options" flex="main:justify cross:center">
        <span @click="toPage('forget')"
          ><d2-icon name="question-circle" /> 忘记密码</span
        >
        <span @click="toPage('register')"
          ><d2-icon name="address-card" /> 注册用户</span
        >
      </p>
      <!-- quick login -->
      <!-- <el-button class="page-login--quick" size="default" type="info" @click="dialogVisible = true">
              快速选择用户（测试功能）
            </el-button> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { PageUtil, refresh } from "@/locales/mixin.js";
export default {
  mixins: [PageUtil, refresh],
  activated() {
    this.refreshCaptcha();
  },
  data() {
    return {
      // 表单
      formLogin: {
        username: "",
        password: "",
        code: ""
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
            max: 20,
            min: 4
          }
        ],
        code: [
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value === "" || !value) callback(new Error("请输入验证码"));
              else if (isNaN(value)) {
                callback(new Error("请输入有效的验证码"));
              }
              callback();
            }
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("d2admin/account", ["login"]),
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const { username, password, code } = this.formLogin;
          this.login({
            username,
            password,
            code
          }).then(() => {
            // 重定向对象不存在则返回顶层路径
            // console.log(this.$route.query.redirect);
            this.$router.replace(this.$route.query.redirect || "/");
          });
        } else {
          // 登录表单校验失败
          this.$message.error("表单校验失败，请检查");
        }
      });
    }
  }
};
</script>

<style lang="scss">
// 登录表单
.page-login--form {
  width: 280px;
  // 卡片
  .el-card {
    margin-bottom: 15px;
  }
  // 登录按钮
  .button-login {
    width: 100%;
  }
  // 输入框左边的图表区域缩窄
  .el-input-group__prepend {
    padding: 0px 14px;
  }
  .login-code {
    height: 40px - 2px;
    display: block;
    margin: 0px -20px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
  // 登陆选项
  .page-login--options {
    margin: 0px;
    padding: 0px;
    font-size: 14px;
    color: $color-primary;
    margin-bottom: 15px;
    font-weight: bold;
  }
  .page-login--quick {
    width: 100%;
  }
}
</style>
