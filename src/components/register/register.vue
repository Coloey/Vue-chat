<template>
<div class="body">
  <div class="login">
     <div class="my-login">
      <div class="card-header">
          <span>注册</span>
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
        <el-form-item >
          <el-button class="my-login-button" type="primary" @click="handleRegister" 
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div> 
</div>
</template>

<script>
import {register} from "../../utils/api"
import {reactive,ref} from 'vue'
export default {
    name:"注册",
    setup(){
      const userForm = reactive({
        username:'',
        password:'',
      })
      const passwordType = ref ("password")
      const visible=ref(true)
      const checked=ref(true)
      const handleRegister=()=>{
            register(userForm).then((res)=>{
                console.log(res)
                this.$router.replace({path:'/login'})
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
        passwordType,
        show,
        checked,
        visible,
        handleRegister
      }
    }

  
}
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