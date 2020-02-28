<template>
  <div class="login">
    <h1>欢迎登陆战“疫”平台</h1>
    <div class="top_hat"></div>
    <div class="login-box">
      <!-- logo -->
      <div class="logo-wrap">
        <div class="logo-box">战</div>
      </div>
      <!-- 登录表单 -->
      <div
        class="input-group"
        :class="{ active: act_index === 1, error: errors.has('cno') }"
      >
        <label for="cm_code">公司编号：</label>
        <input
          name="cno"
          v-validate="{ required: true, max: 6, min: 4 }"
          @focus="act_index = 1"
          type="number"
          id="cm_code"
          v-model="cm_code"
        />
      </div>
      <div
        class="input-group"
        :class="{ active: act_index === 2, error: errors.has('pno') }"
      >
        <label for="PNO">员工编号：</label>
        <input
          name="pno"
          v-validate="{ required: true, max: 8, min: 6 }"
          @focus="act_index = 2"
          type="number"
          id="PNO"
          v-model="PNO"
        />
      </div>
      <div
        class="input-group"
        :class="{ active: act_index === 3, error: errors.has('pwd') }"
      >
        <label for="Pwd">登陆密码：</label>
        <input
          name="pwd"
          v-validate="{ required: true, max: 12, min: 4 }"
          @focus="act_index = 3"
          type="number"
          id="Pwd"
          v-model="Pwd"
        />
      </div>
      <div class="ck_row">
        <div class="ckbox_wrap" @click="remSet" :class="{ active: rem }">
          <i
            class="iconfont"
            :class="{ 'icon-check-square': rem, 'icon-border': !rem }"
          ></i>
          <span>记住密码</span>
        </div>
        <div
          @click="autologinSet"
          class="ckbox_wrap"
          :class="{ active: autologin }"
        >
          <i
            class="iconfont"
            :class="{
              'icon-check-square': autologin,
              'icon-border': !autologin
            }"
          ></i>
          <span>自动登录</span>
        </div>
      </div>
    </div>
    <div class="btn-wrap" @click="loginBtnClick">
      登录
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Indicator } from "mint-ui";
import "../assets/font/iconfont.css";
export default {
  name: "login",
  data() {
    return {
      act_index: 1,
      cm_code: "",
      PNO: "",
      Pwd: "",
      rem: false,
      autologin: false
    };
  },
  mounted() {
    this.$validator.validate();
  },
  methods: {
    autologinSet() {
      this.autologin = !this.autologin;
      this.autologin && (this.rem = true);
    },
    remSet() {
      this.rem = !this.rem;
      this.rem || (this.autologin = false);
    },
    loginBtnClick() {
      if (this.errors.any()) {
        console.log("wrong");
        return;
      }
      console.log("no wrong");
      //弹出waiting遮罩层
      Indicator.open("正在登录...");
      setTimeout(() => {
        Indicator.close();
      }, 2000);
      //发送ajax请求,axios
      axios
        .post("/login", {
          CNO: this.cm_code,
          PNO: this.PNO,
          Passwd: this.Pwd
        })
        .then(res => {
          console.log(res);
          Indicator.close();
        })
        .catch(e => {
          console.log("wrong", e);
          Indicator.close();
        });
    }
  }
};
</script>

<style>
html,
body,
#app {
  margin: 0;
  height: 100%;
  background-color: #2ade69;
}
</style>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 36px;
  height: 36px;
  padding: 68px 0 44px 0;
  line-height: 36px;
  color: white;
}

@mixin login_wrap {
  width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 20px;
}
.login {
  background-color: #2ade69;
  .top_hat {
    width: 537px;
    height: 18px;
    background-color: #eee;
    margin: 0 auto;
    border-radius: 18px 18px 0 0;
  }
  .login-box {
    height: 836px;
    @include login_wrap();
    .logo-wrap {
      padding: 80px 0;
      .logo-box {
        width: 190px;
        height: 190px;
        margin: 0 auto;
        background-color: lightblue;
        border-radius: 95px;
        font-size: 120px;
        text-align: center;
        line-height: 170px;
      }
    }

    @mixin rowStyle() {
      padding: 0 36px;
      color: $text-color;
      width: 400px;
    }
    .input-group {
      border: 2px solid #e2e2e2;
      border-radius: 45px;
      font-size: $text-size-mid;
      line-height: 90px;
      @include rowStyle();
      margin: 0 auto 30px;
      input {
        border: 0 none;
        line-height: 90px;
        font-size: $text-size-mid;
        width: 200px;
        padding-left: 1em;
      }
    }
    .input-group.active {
      color: $act-color;
      border: 2px solid $act-color;
    }
    .input-group.error {
      color: red;
      border: 2px solid red;
    }
    .ck_row {
      font-size: $text-size;
      @include rowStyle();
      display: flex;
      justify-content: space-around;
      .ckbox_wrap {
        padding-top: 8px;
        padding-left: 36px;
        i::before {
          display: inline-block;
          height: 30px;
          width: 30px;
        }
      }
      .ckbox_wrap.active {
        color: $act-color;
      }
    }
  }
  .btn-wrap {
    @include login_wrap();
    font-weight: bold;
    letter-spacing: 10px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    font-size: $text-size-imp;
    color: $act-color;
    margin-top: 20px;
  }
}
</style>
