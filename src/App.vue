<template>
  <div id="app">
    <div class="outer" :class="{'hideLeft':$route.path.split('/').length>2}">
    <div :class="{'hideLeft':$route.path.indexOf('login')!==-1||$route.path.indexOf('register')!=-1}">
       <header class="app-header" :class="{'header-hide':!$store.state.headerStatus}"> 
        <wx-header :pageName="pageName"></wx-header>
      </header>
      <!-- 搜索框 -->
      <search></search>
    </div>
      <!-- 三个页面“通讯录” “通知” ”个人“-->
      <section class="app-content">
        <router-view v-slot="{ Component }" name="default">
          <transition>
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </section>
      <!-- 底部导航路由 -->
      <footer class="app-footer" :class="{'hideLeft':$route.path.indexOf('login')!==-1||$route.path.indexOf('register')!=-1}">
        <wx-nav></wx-nav>
      </footer>
    </div>
    <transition
      name="custom-classes-transition"
      :enter-active-class="enterAnimate"
      :leave-active-class="leaveAnimate">
      <router-view name="subPage" class="sub-page"></router-view>
    </transition>
  </div>
</template>
<script>
import WxHeader from "./components/common/wx-header.vue";
import WxNav from "./components/common/wx-nav.vue";
import search from "./components/common/search.vue";
import login from "./components/login/login.vue"
import mixin from "./store/mixin";
import { useRoute,useRouter } from 'vue-router';
import {ref,watch,onMounted} from 'vue'
import {useStore} from 'vuex'
window.mixin=mixin
export default {
   name: 'app',
        components: {
            WxHeader,
            WxNav,
            search,
            login,
        },
        
        setup(){
            const pageName=ref("")
            const routerAnimate=ref(false)
            const enterAnimate=ref("") //页面进入动效
            const leaveAnimate=ref("")  //页面离开动效
            const route=useRoute()
            const store=useStore()
             const router = useRouter()
             onMounted(()=>{
               if(window.localStorage.getItem('token')==undefined){
                 router.push("/login")
               }
             })
           
            //监听route ,为进入内页设置不同的过渡效果
            watch(route,(to,from)=>{
                const toDepth=to.path.split('/').length
                const fromDepth=from.path.split('/').length
                if(toDepth===2){
                    store.commit("setPageName",to.name)

                }
                //同一级页面不需要设置过渡效果
                if(toDepth===fromDepth){
                    return;
                }
                  this.enterAnimate = toDepth > fromDepth ? "animated fadeInRight" : "animated fadeInLeft"
                this.leaveAnimate = toDepth > fromDepth ? "animated fadeOutLeft" : "animated fadeOutRight"
                     // 从店面页进入店内页 需要对店内页重新设置离开动效 因为他们处于不同 name 的 router-view
                if (toDepth === 3) {
                    this.leaveAnimate = "animated fadeOutRight"
                }
            });
            return{
                pageName,
                routerAnimate,
                enterAnimate,
                leaveAnimate,
                
            }
        },     
};
</script>
<style lang="less">
/*.hideLeft {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    transition: 1.0s;
    overflow: hidden;
}*/
/*将公用的样式统一在此导入*/

@import "assets/css/base.css";
@import "assets/css/common.css";
@import "assets/less/wx-header.less";
/*阿里 fonticon*/

@import "assets/css/lib/iconfont.css";
/*过渡效果需要的动画库*/

@import "assets/css/lib/animate.css";
/*weui 样式库 适合高仿微信*/

@import "assets/css/lib/weui.min.css";
</style>