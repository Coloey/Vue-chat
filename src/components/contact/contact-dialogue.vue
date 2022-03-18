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
    <div class="dialogue-section clearfix">
       <li 
        class="self clearfix"
        v-for="(item, index) in msgArr"
        :key="index"
        v-show="item.toUser==$route.query.id"        
      >
        <p class="text"  v-more>{{ item.text }}</p>
        <div class="header"><img :src="$store.state.userInfo.avatar"  /></div>
      </li>
      <span class="msg-more" id="msg-more">
        <ul>
          <li>复制</li>
          <li>转发</li>
          <li>删除</li>
        </ul>
      </span>
    </div>
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
            v-model="InpVal"
            class="chat-txt"
            @focus="focusIpt"
            @blur="blurIpt"
          />
        </div>
        <span class="expression iconfont icon-dialogue-smile"></span>
        <span class="more iconfont" 
        style="font-size: 15px;
              background: #aa96da;
              padding: 0px 5px;
              border-radius: 12px;
              color: #fff;" 
        @click="submit">发送</span>
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
import {useStore} from "vuex";
import { ref } from "vue";
import CHAT from "../../client"

export default {
  name: "contact-dialogue",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit("setPageName", vm.$route.query.name);
    });
  },
  setup() {
    const route = useRoute();
    const store=useStore();
    let pageName = ref(route.query.name);
    let currentChatWay = ref(true); //true为键盘打字,false为语音输入
    let timer = ref(null);
    let InpVal=ref("");
    let msgArr=ref(CHAT.msgArr);
    const submit=()=>{
      var date=new Date().toLocaleString();         
      const obj={
        date:date,
        text:InpVal.value,
        toUser:route.query.id,
      }
       const lastMsg={
         date:date,
         text:InpVal.value,
       }
      const id=route.query.id
      store.commit('changeLastMsg',{lastMsg,id});
      InpVal.value="";
      CHAT.submit(obj)
      msgArr.value=CHAT.msgArr;
     // let msg=msgArr.value;
      //console.log(msg)
      //store.commit('addLatestContact',{id,msg});
      //
    };
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
        msgArr,
        submit,
        InpVal
    }
  },
  directives:{
     more: {
      mounted(element) {
        var startTx, startTy;
        element.addEventListener(
          "touchstart",
          function (e) {
            var msgMore = document.getElementById("msg-more"),
              touches = e.touches[0];
            startTx = touches.clientX;
            startTy = touches.clientY;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
              // 控制菜单的位置
              msgMore.style.left =
                (startTx - 18 > 180 ? 180 : startTx - 18) + "px";
              msgMore.style.top = element.offsetTop - 33 + "px";
              msgMore.style.display = "block";
              element.style.backgroundColor = "#e5e5e5";
            }, 500);
          },
          false
        );
        element.addEventListener(
          "touchmove",
          function (e) {
            var touches = e.changedTouches[0],
              disY = touches.clientY;
            if (Math.abs(disY - startTy) > 10) {
              clearTimeout(this.timer);
            }
          },
          false
        );
        element.addEventListener(
          "touchend",
          function () {
            clearTimeout(this.timer);
          },
          false
        );
      },
    },
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