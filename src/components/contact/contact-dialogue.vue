<template>
  <div>
    <header id="wx-header">
      <div class="center">
        <div class="iconfont icon-return-arrow" @click="$router.back()">
          <span>返回</span>
        </div>
        <span>{{ pageName }}</span>
      </div>
    </header>
    <footer class="dialogue-footer">
      <div class="component-dialogue-bar-person">
        <span
          class="iconfont icon-dialogue-jianpan"
          v-show="!currentChatWay"
          @click="currentChatWay = true"
        >
        </span>
        <span
          class="iconfont icon-dialogue-voice"
          v-show="currentChatWay"
          @click="currentChatWay = false"
        >
        </span>
        <div class="chat-way" v-show="!currentChatWay">
          <div class="chat-say" v-press>
            <span class="one">按住 说话</span>
            <span class="two">松开 结束</span>
          </div>
        </div>
        <div class="chat-way" v-show="currentChatWay">
          <input
            type="text"
            class="chat-txt"
            @focus="focusIpt"
            @blur="blurIpt"
          />
        </div>
        <span class="expression iconfont icon-dialogue-smile"></span>
        <span class="more iconfont icon-dialogue-jia"></span>
        <div class="recording" style="display: none" id="recording">
          <div
            class="recording-voice"
            style="display: none"
            id="recording-voice"
          >
            <div class="voice-inner">
              <div class="voice-icon"></div>
              <div class="voice-volume">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <p>手指上划，取消发送</p>
          </div >
          <div class="recording-cancel" style="display:none">
              <div class="cancel-inner"></div>
              <p>松开手指，取消发送</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  name: "contact-dialogue",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit("setPageName", vm.$route.query.name);
    });
  },
  setup() {
    const route = useRoute();
    let pageName = ref(route.query.name);
    let currentChatWay = ref(true); //true为键盘打字,false为语音输入
    let timer = ref(null);
    const focusIpt=()=>{
        timer=setInterval(function(){
            document.body.scrollTop=document.body.scrollHeight;
        },100);
    }
    const blurIpt=()=>{
        clearInterval(timer);
    }
    return {
        pageName,
        currentChatWay,
        focusIpt,
        blurIpt,
    }
  },
  directives:{
      press:{
          mounted(element){
              var recording=document.querySelector(".recording"),
                  recordingVoice=document.querySelector(".recording-voice"),
                  recordingCancel=document.querySelector(".recording-cancel"),
                  startTy;
              element.addEventListener("touchstart",function(e){
                  element.className="chat-say say-active";
                  recording.style.display=recordingVoice.style.display="block"
                  var touches=e.touches[0];
                  startTy=touches.clientY;
                  e.preventDefault();
                  
              },false);
              element.addEventListener("touchend",function(e){
                  element.className="chat-say";
                  recordingCancel.style.display=recording.style.display=
                  recordingVoice.style.display="none";
                  e.preventDefault();
            },false);
            element.addEventListener("touchmove",function(e){
                var touches=e.changedTouches[0],
                endTy=touches.clientY,
                distanceY=startTy-endTy;
                if(distanceY>50){
                    element.className="chat-say";
                    recordingVoice.style.display="none";
                    recordingCancel.style.display="block"

                }else{
                    element.className="chat-say say-active";
                    recordingVoice.style.display="block";
                    recordingCancel.style.display="none";
                }
                e.preventDefault();
            },false)


           }
       }
  }
};
</script>
<style lang="less">
@import "../../assets/less/dialogue.less";
.say-active {
    background: #c6c7ca;
}
</style>