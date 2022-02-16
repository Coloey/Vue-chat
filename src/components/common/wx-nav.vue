<template>
  <div id="wx-nav">
    <nav>
      <router-link to="/" tag="dl" exact>
      <dl>
         <dt class="iconfont icon-wechat">
          <i class="new-msg-count" v-show="$store.state.newMsgCount">{{
            $store.state.newMsgCount
          }}</i>
        </dt>
        <dd>信息</dd>
      </dl>
       
      </router-link>
      <router-link to="/contact" tag="dl">
        <dl>
          <dt class="iconfont icon-contact"></dt>
        <dd>通讯录</dd>
        </dl>
      </router-link>
      <router-link to="/self" tag="dl">
        <dl>
          <dt class="iconfont icon-me"></dt>
          <dd>我</dd>
        </dl>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  mounted() {
    for (let i in this.$store.state.msgList.baseMsg) {
      if (
        this.$store.state.msgList.baseMsg[i].read === false &&
        this.$store.state.msgList.baseMsg[i].quiet === false
      ) {
        this.$store.commit("addNewMsg",i);
      }
    }
  },
};
</script>

<style lang="less">
@import "../../assets/less/wx-nav.less";
</style>