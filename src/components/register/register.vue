<template>
<el-card shadow="always" class="login">
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
  </el-card>
  
</template>

<script>
import {register} from "../../utils/api"
export default {
    name:"注册",
    data(){
        return{
            userForm:{
                username:"",
                password:""
            },
            checked:true,
            visible:true,
        }
    },
    methods:{
        handleRegister(){
            register(this.userForm).then((res)=>{
                console.log(res)
                this.$router.replace({path:'/login'})
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