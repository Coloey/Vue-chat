<template>
  <li>
    <router-link
      :to="{
        path: '/chat/dialogue',
        query: { id: item.id, name: item.user.name },
      }"
      v-on:click="toggleMsgRead(item.id,'enter')"
    >
      <div class="list-info">
        <div class="header-box">
          <!-- 未读且未屏蔽，显示新信息数量 -->
          <i class="new-msg-count" v-show="!read && !quiet&&item.newMsgCount>0">{{
            item.newMsgCount
          }}</i>
          <!-- 未读且屏蔽，只显示小红点 -->
          <i class="new-msg-dot" v-show="!read && quiet"></i>
          <div class="header">
            <img :src="item.user.headerUrl" />
          </div>
        </div>
        <div class="desc-box">
          <div class="desc-time">{{ time(Object.keys(item.lastMsg).length===0?item.msg[item.msg.length-1].date:item.lastMsg.date) }}</div>
          <div class="desc-author">{{ item.user.name }}</div>
          <div class="desc-msg">
            <div class="desc-mute iconfont icon-mute" v-show="item.quite"></div>
            <span>{{ Object.keys(item.lastMsg).length===0?item.msg[item.msg.length-1].text:item.lastMsg.text  }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </li>
</template>
<script>
import { useStore } from "vuex";
import { toRefs } from "vue";
export default {
  name:"msgItem",
  props: ["item"],
  setup(props) {
    const store = useStore();
    const { read, quiet} = toRefs(toRefs(props.item));
    //console.log(props/)
    //切换消息已读或未读状态
    const toggleMsgRead=(id,value)=>{store.dispatch('toggleMsgRead',id,value)}
    const time = (value) => new Date(value).toLocaleTimeString();
  
    return {
      time,
      toggleMsgRead,
      read,
      quiet,
      
    };
  },
};
</script>
<style>
</style>