<template>
  <div class="body">
  <div  class="login">
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
              v-model="userForm.password"
              ref="password"
              :type="passwordType"
            />
            <img
              src="../../assets/images/eyesopen.png"
              id="eyes-img"
              v-show="!visible"
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
    </div>
  </div>
</template>

<script>
import {login,getUserInfo} from "../../utils/api"
import {ElForm,ElFormItem,ElButton} from "element-plus"
import {ref,reactive} from "vue"
import { useRouter } from "vue-router"
import CHAT from "../../client"
import { useStore } from 'vuex'
export default {
  name: "登录",
  components:{
    ElForm,ElFormItem,ElButton
  },
  setup(){
    const userForm = reactive({
      username:'',
      password:'',
    })
    const checked = ref(true)
    const visible = ref(true)
    const passwordType = ref ("password")
    const router =useRouter()
    const store =useStore()
    function handleLogin(){
       login({username:userForm.username,password:userForm.password}).then(()=>{
          router.push({path:'/'});
          getUserInfo().then(()=>{
            CHAT.init(store.state.userInfo.username);//使用户初始化服务器
          })

       })
    }
    const show=()=>{
      if(visible.value){
        passwordType.value="text"
      }else {
        passwordType.value = "password"
      }
      visible.value =!visible.value
    }
    return {
      userForm,
      checked,
      passwordType,
      handleLogin,
      show,
      visible,
    }
  },
  
};
</script>

<style lang="less">
@import "../../assets/less/login.less";
</style>