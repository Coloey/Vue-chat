<template>
  <div id="self">
    <div class="weui-tab_content" style="display: block">
      <div class="weui-cells">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell_hd">
            <img
              src="https://th.bing.com/th/id/OIP.qRVjKh2NMb3kuzi1GpeS3AAAAA?w=165&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7"
              alt=""
              class="self-header"
            />
          </div>
          <div class="weui-cell_bd">
            <h4 class="self-name">张小小</h4>
            <p class="self-wxid">id:201914145</p>
            <p class="self-wxid">班级：19软件工程1班</p>
          </div>
        </div>
      </div>
      <div class="weui-cells">
          <router-link to="/self/setting" class="weui-cell weui-cell_access">
            <div class="weui-cell_hd">
               <img src="../../assets/images/me_more-setting.png" alt="" style="width:23px"/> 
            </div>
            <div class="weui-cell_bd">
              <p style="margin-left:10px" >设置</p>
            </div>
          </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "self",
  mixins: [window.mixin],
  setup() {
    const pageName = ref("我");
    return {
      pageName,
    };
  },
};
</script>

<style lang="less">
@import "../../assets/less/self.less";
</style>