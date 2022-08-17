<template>
  <div>
    <header id="wx-header">
      <div class="other">
             <router-link
          :to="{ path:'/contact/details/contact-dialogue-details',query:{msgInfo2}}"
          tag="span"
          class="iconfont icon-chat-friends"
        >
        </router-link>
      </div>
      <div class="center">
        <div class="iconfont icon-return-arrow" @click="$router.back()">
          <span>返回</span>
        </div>
        <span>{{ pageName }}</span>
      </div>
    </header>
    <div class="dialogue-section clearfix">
      <div v-for="(item, index) in msg"
        :key="index"  >
         <li 
        class="self clearfix"
        v-show="item.toUser==$route.query.username&&item.fromUser==$store.state.userInfo.username"     
      >     
        <p class="text"  v-more>{{ item.text }}
        <img :src=item.imageUrl alt="" >
        </p>
        <div class="header"><img :src="$store.state.userInfo.user_pic"  /></div>      
      </li>
       <li 
        class="other clearfix"
        v-show="item.toUser==$store.state.userInfo.username&&item.fromUser==$route.query.username" 
      >
         <!-- 获取当前聊天的人的头像 -->
        <div class="header"><img :src="otherpic.headerUrl" /></div>
         <p class="text"  v-more>
          {{ item.text }}
           <img :src=item.imageUrl alt="">
          </p>     
      </li>
      </div>
      <span class="msg-more" id="msg-more">
        <ul>
          <li>复制</li>
          <li>转发</li>
          <li>删除</li>
        </ul>
      </span>
    </div>
    <div class="emoji-container" v-show="emojihowVisible">
        <emotion @chooseEmojiDefault="chooseEmojiDefault"></emotion>
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
          <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
           
        </div>              
        <span class="expression iconfont icon-dialogue-smile" @click.stop="emojiShow"></span>    
        <label class="iconfont icon-dialogue-jia" for="image_uploads"></label>
        <input type="file" id="image_uploads" name="image_uploads" 
        @change="uploadFiles"
        accept=".jpg, .jpeg, .png" multiple
        style="display:none">
        
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
import { onMounted,  computed,  ref } from "vue";
import  contact from "../../store/contacts"
import CHAT from "../../client"
import debounce from "../../utils/debounce"
import emotion from './emotion.vue';
//import { ElUpload} from "element-plus";
export default {
  components: { emotion},
  name: "contact-dialogue",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit("setPageName", vm.$route.query.name);
    });
  },

  setup() {
    const route = useRoute();
    const store=useStore();
    //true为键盘打字,false为语音输入
    let currentChatWay = ref(true); 
    let timer = ref(null);
    let InpVal=ref("");
    //表情包子组件
    const emojihowVisible=ref(false)
    const emojiShow=()=>{
      emojihowVisible.value=!emojihowVisible.value
    }
    const chooseEmojiDefault=(e)=>{
      //console.log(e)
        InpVal.value=e;
    }
   
    const msg=computed(()=>{return store.state.msg});
    const msgInfo =computed(()=>{
      return contact.getUserInfo(route.query.id)
    })
    const msgInfo2=computed(()=>{
      //对象作为路由参数时需要先转化为JSON格式的数据
      return encodeURIComponent(JSON.stringify(msgInfo.value))
     })
    let pageName = ref(msgInfo.value.nickname);
    //发送方图片
    const imageUrl = ref("")
    const uploadFiles=(e)=>{
      let executeFile = e.target.files[0]     
      imageUrl.value = URL.createObjectURL(executeFile)
      console.log(imageUrl.value)
    }
    
    //对方头像
    const otherpic=computed(()=>{
      return contact.getUserInfo(route.query.id)
    })
    
    onMounted(()=>{
      CHAT.message(store.state.userInfo.username)
    })
    const submit=debounce(()=>{
     
      var date=new Date().toLocaleString();  
      console.log(imageUrl.value)
      //console.log(route.query.id)       
      const obj={
        date:date,
        text:InpVal.value,
        fromUser:store.state.userInfo.username,
        toUser:route.query.username,
        imageUrl:imageUrl.value
      }
      
      InpVal.value="";
      CHAT.submit(obj)
     
    },500)
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
        submit,
        InpVal,
        otherpic,
        msg,
        msgInfo,
        msgInfo2,
        chooseEmojiDefault,
        emojiShow,
        emojihowVisible,
        uploadFiles
       
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
<style lang="less" scoped>
@import "../../assets/less/dialogue.less";
.say-active {
    background: #c6c7ca;
}
  

</style>