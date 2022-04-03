<template>
<div>
    <header id="wx-header">
      <div class="center">
        <div class="iconfont icon-return-arrow" v-on:click="$router.back()">
          <span>返回</span>
        </div>
        <span>聊天详情</span>
      </div>
    </header>
    <div class="chat-collect">
      <div class="member">
        <div><img :src="msgInfo2.headerUrl" alt="" /></div>
        <p>{{ msgInfo2.name }}</p>
      </div>
    </div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_switch">
        <div class="weui-cell_bd">置顶聊天</div>
        <div class="weui-cell_ft">
          <input type="checkbox" class="weui-switch">
        </div>
      </div>
      <div class="weui-cell weui-cell_switch">
        <div class="weui-cell_bd">消息免打扰</div>
        <div class="weui-cell_ft">
          <input type="checkbox" class="weui-switch" v-model="msgInfo2.quiet" />
        </div>
      </div>
    </div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell_bd">聊天文件</div>
        <div class="weui-cell_ft"></div>
      </div>
    </div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell_bd">清空聊天记录</div>
        <div class="weui-cell_ft"></div>
      </div>
    </div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">投诉</div>
        <div class="weui-cell__ft"></div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
    name:"contact-dialogur-details",
    setup() {
    const route = useRoute();
    const msgInfo2 = computed(() => {
      return JSON.parse(decodeURIComponent(route.query.msgInfo2));
    });
    return {
      msgInfo2,
    };
  },
};

</script>

<style>
.weui-cell_bd {
    flex:1

}
.chat-collect {
    background: #fff;
    position: relative;
    padding: 15px 10px 5px; 
    width: 100%;
    height: 120px;
}
.chat-collect .member {
  float: left;
  font-size: 14px;
  text-align: center;
}
.chat-collect ::before {
  content: "";
  position: absolute;
  width: 200%;
  left: 0;
  bottom: 0;
  background-color: #b7b7b7;
  height: 1px;
  z-index: 2;
}
.member img {
  width: 50px;
  padding-top: 5px;
}
.member p {
  padding-top: 5px;
}
.weui-switch:checked {
  border-color: #66bb6a;
  background-color: #66bb6a;
}
</style>

