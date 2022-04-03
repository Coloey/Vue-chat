<template>
  <el-card shadow="always" class="login">
    <div class="my-login">
      <div class="card-header">
          <span>登录</span>
      </div>
      <el-form
  
        :model="userForm"
      >
        <el-form-item prop="account">
            <div class="my-form">
            <img src="../../assets/images/user.png" id="user-img" />
            <input
              class="my-input"
              placeholder="用户名"
              v-model="userForm.username"
             
            />
          </div>
        </el-form-item>

        <el-form-item prop="password">
          <div class="my-form">
            <img src="../../assets/images/lock.png" id="password-img" />
            <input
              class="my-input"
              placeholder="密码"
              type="password"
              v-model="userForm.password"
              ref="password"
            />
            <img
              src="../../assets/images/eyesopen.png"
              id="eyes-img"
              v-show="!visible"
              ref="eyes"
              @click="show()"
            />
            <img
              src="../../assets/images/eyesclose.png"
              id="eyes-img"
              v-show="visible"
              alt=""
              @click="show()"
            />
          </div>
        </el-form-item>
        <el-checkbox v-model="remember" label="记住密码"></el-checkbox>
        <el-form-item >
          <el-button class="my-login-button" type="primary" @click="handleLogin" 
            >登录</el-button
          >
        </el-form-item>
        <el-from-item>
          <router-link :to="{path:'/register'}" class="register">没有账号，请先注册</router-link>
        </el-from-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import {login,getUserInfo} from "../../utils/api"
import CHAT from "../../client"
export default {
  name: "登录",
  data() {
    return {
      logining:true,
      userForm:{
        username: "",
        password: "",

      },       
      checked: true,
      visible: true,
    };
  },
  methods: {
    handleLogin() {
      login({username:this.userForm.username,password:this.userForm.password}).then(()=>{
        this.$router.push({path:'/'});
         //登录成功后获取用户信息
        getUserInfo().then(()=>{
          //console.log(res.data.data.id)
          CHAT.init(this.$store.state.userInfo.username);//使用户初始化服务器
        
        })
        
      })       
    },
    show() {
      if (this.visible) {
        this.$refs.password.setAttribute("type", "text");
      } else {
        this.$refs.password.setAttribute("type", "password");
      }
      this.visible = !this.visible;
    },
  },
};
</script>

<style lang="less">
:root {
  --el-color-primary: #409eff;
  --el-color-success: #67c23a;
  --el-color-warning: #e6a23c;
  --el-color-danger: #f56c6c;
  --el-color-error: #f56c6c;
  --el-color-info: #909399;
}
@import "../../assets/less/login.less";
</style>