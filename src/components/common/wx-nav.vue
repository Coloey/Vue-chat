<template>
  <div id="wx-nav">
    <nav>
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
  
};
</script>

<style lang="less">
@import "../../assets/less/wx-nav.less";
</style>