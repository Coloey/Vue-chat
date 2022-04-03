<template>
  <div class="profile">
      <header id="wx-header">
          <div class="center">
              <router-link  to="/contact" tag="div" class="iconfont icon-return-arrow">
              <span>通讯录</span>
              </router-link>
              <span>详细资料</span>
          </div>
      </header>
      <div class="weui-cells">
          <div class="weui-cell">
              <div class="weui-cell_hd" style="margin-right:10px">
                  <img :src="userInfo.headerUrl" alt="" class="self-header" style="width:60px">
              </div>
              <div class="weui-cell_bd">
                  <h4 class="self-name">{{userInfo.name}} <span class="gender" :class="[userInfo.sex===1?'gender-male':'gender-female']"></span></h4>
                  <p class="self-wxid" style="font-size:13px;color:rgb(153,153,153)"> ID:{{userInfo.id}}</p>
              </div>
          </div>
      </div>
      <router-link :to="{path:'/contact/details/contact-dialogue',query:{id:userInfo.id,username:userInfo.name} }" class="weui-btn weui-btn_primary" style="width:90%;margin-top:20px;background-color:#009688"> 发消息</router-link>
      <a href="javascript:;" class="weui-btn weui-btn_default" style="width: 90%"> 视频</a>

  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import contact from "../../store/contacts"
import {computed} from "vue"
export default {
    name:"details",
    setup(){
        const route=useRoute()
        const userInfo=computed(()=>{return contact.getUserInfo(route.query.id)})
        return {
            userInfo,
        }
    }
}
</script>

<style lang="less">
@import"../../assets/less/self.less";
</style>