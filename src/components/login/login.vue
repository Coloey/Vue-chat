<template>
  <el-card shadow="always" class="login">
    <div class="my-login">
      <div class="card-header">
          <span>登录</span>
      </div>
      <el-form
        ref="userForm"
        :model="userForm"
      >
        <el-form-item prop="account">
            <div class="my-form">
            <img src="../../assets/images/user.png" id="user-img" />
            <input
              class="my-input"
              placeholder="用户名"
              v-model="userForm.account"
              ref="account"
            />
            <p style="display:none" ref="user">!用户名错误</p>
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
            <p style="display:none" ref="pwd">!密码错误</p>
          </div>
        </el-form-item>

        <el-checkbox v-model="remember" label="记住密码"></el-checkbox>
        <el-form-item >
          <el-button class="me-login-button" type="primary" @click="handleLogin" 
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      logining:true,
      userForm: {
        account: "",
        password: "",
      },
      /*rules: {
        account: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, message: "密码至少有6个字符" },
        ],
      },*/
      checked: true,
      visible: true,
    };
  },
  methods: {
    handleLogin() {
       this.$refs.user.style.display="none"
       this.$refs.pwd.style.display="none"

        if (this.userForm.account == this.$store.state.userInfo.name &&this.userForm.password == this.$store.state.userInfo.password) {
            setTimeout(()=>{
                 this.$router.push({path:'/'});
                 this.$store.state.logining=false;
                 //this.logining=false;
            },2000)
        }  
        else{ 
          console.log(this.userForm.account===this.$store.state.userInfo.name)
            console.log(this.userForm.password)
            console.log(this.$store.state.userInfo.password)
            console.log(this.userForm.password==this.$store.state.userInfo.password)
            if(this.userForm.account!==this.$store.state.userInfo.name){
                this.$refs.user.style.color="red"
                this.$refs.user.style.display="block"

            }
            if(this.userForm.password!=this.$store.state.userInfo.password){
                this.$refs.pwd.style.color="red"
                this.$refs.pwd.style.display="block"
            } 
        }
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