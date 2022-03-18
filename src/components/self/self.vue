<template>
  <div id="self">
    <div class="weui-tab_content" style="display: block">
      <div class="weui-cells">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell_hd">
            <img
              :src="$store.state.userInfo.avatar"
              alt=""
              class="self-header"
            />
          </div>
          <div class="weui-cell_bd">
            <h4 class="self-name">{{$store.state.userInfo.name}}</h4>
            <p class="self-wxid">id:{{$store.state.userInfo.mid}}</p>
            <p class="self-wxid">班级：{{$store.state.userInfo.class}}</p>
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