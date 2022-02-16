<template>
  <div class="dialogue">
    <header id="wx-header">
        <div class="other">
             <router-link
          :to="{ path:'/chat/dialogue/dialogue-detail',query:{msgInfo2}}"
          tag="span"
          class="iconfont icon-chat-friends"
        >
        </router-link>
        </div>
      <div class="center">
        <router-link to="/" tag="div" class="iconfont icon-return-arrow">
          <span>信息</span>
        </router-link>
        <span>{{ pageName }}</span>
      </div>
    </header>
    <section class="dialogue-section clearfix">
      <div
        class="row clearfix"
        v-for="(item, index) in msgInfo.msg"
        :key="index"
      >
        <img :src="item.headerUrl" class="header" />
        <p class="text" v-more>{{ item.text }}</p>
      </div>
      <span class="msg-more" id="msg-more">
        <ul>
          <li>复制</li>
          <li>转发</li>
          <li>删除</li>
        </ul>
      </span>
    </section>
    <footer class="dialogue-footer">
      <div class="component-dialogue-bar-person">
        <span
          class="iconfont icon-dialogue-jianpan"
          v-show="!currentChatWay"
          v-on:click="currentChatWay = true"
        ></span>
        <span
          class="iconfont icon-dialogue-voice"
          v-show="currentChatWay"
          v-on:click="currentChatWay = false"
        ></span>
        <div class="chat-way" v-show="!currentChatWay">
          <div class="chat-say" v-press>
            <span class="one">按住 说话</span>
            <span class="two">松开 结束</span>
          </div>
        </div>
        <div class="chat-way" v-show="currentChatWay">
          <input
            class="chat-txt"
            type="text"
            v-on:focus="focusIpt"
            v-on:blur="blurIpt"
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
            <p>手指上划,取消发送</p>
          </div>
          <div class="recording-cancel" style="display: none">
            <div class="cancel-inner"></div>
            <p>松开手指,取消发送</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {ref} from "vue"
export default {
  name:"dialogue",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit("setPageName", vm.$route.query.name);
    });
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    let pageName = ref(route.query.name);
    let currentChatWay = ref(true); //true为键盘打字,false为语音输入
    let timer = ref(null);
    //console.log(route)
    const msgInfo = computed(() => {
      for (let i in store.state.msgList.baseMsg) {
        if (store.state.msgList.baseMsg[i].mid == route.query.mid) {
           return store.state.msgList.baseMsg[i];
        }
      }
      return {};
    });
    const msgInfo2=computed(()=>{
        return encodeURIComponent(JSON.stringify(msgInfo.value))
    })
    const focusIpt = () => {
      timer = setInterval(function () {
        document.body.scrollTop = document.body.scrollHeight;
      }, 100);
    };
    const blurIpt = () => {
      clearInterval(timer);
    };
    return {
      pageName,
      currentChatWay,
      focusIpt,
      blurIpt,
      msgInfo,
      msgInfo2
    };
  },
  directives: {
    press: {
      mounted(element) {
        var recording = document.querySelector(".recording"),
          recordingVoice = document.querySelector(".recording-voice"),
          recordingCancel = document.querySelector(".recording-cancel"),
          // startTx,
          startTy;
        element.addEventListener(
          "touchstart",
          function (e) {
            element.className = "chat-say say-active";
            recording.style.display = recordingVoice.style.display = "block";
            var touches = e.touches[0];
            // startTx = touches.clientX
            startTy = touches.clientY;
            e.preventDefault();
          },
          false
        );
        element.addEventListener(
          "touchend",
          function (e) {
            /*var touches = e.changedTouches[0];
                        var distanceY = startTy - touches.clientY;
                        if (distanceY > 50) {
                            console.log("取消发送信息");
                        }else{
                            console.log("发送信息");
                        }*/
            element.className = "chat-say";
            recordingCancel.style.display =
              recording.style.display =
              recordingVoice.style.display =
                "none";
            e.preventDefault();
          },
          false
        );
        element.addEventListener(
          "touchmove",
          function (e) {
            var touches = e.changedTouches[0],
              // endTx = touches.clientX,
              endTy = touches.clientY,
              // distanceX = startTx - endTx,
              distanceY = startTy - endTy;
            if (distanceY > 50) {
              element.className = "chat-say";
              recordingVoice.style.display = "none";
              recordingCancel.style.display = "block";
            } else {
              element.className = "chat-say say-active";
              recordingVoice.style.display = "block";
              recordingCancel.style.display = "none";
            }
            // 阻断事件冒泡 防止页面被一同向上滑动
            e.preventDefault();
          },
          false
        );
      },
    },
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
  },
};
</script>
<style lang="less">
@import "../../assets/less/dialogue.less";
.say-active {
    background:#c6c7ca;

} 
</style>