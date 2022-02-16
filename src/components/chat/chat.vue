<template>
  <div id="wechat">
    <ul class="wechat-list">
      <msgItem
        v-for="baseMsgObj in $store.state.msgList.baseMsg"
        :item="baseMsgObj"
        class="list-row line-bottom"
        :key="baseMsgObj.mid"
        v-more
      >
      </msgItem>
      <span class="operate-box" id="operate-box">
        <ul>
          <li class="operate-unread" v-if="read">
            标为未读
          </li>
          <li class="operate-read" v-else>标为已读</li>
          <li>删除</li>
        </ul>
      </span>
    </ul>
  </div>
</template>

<script>
import msgItem from "../chat/msg-item.vue";
import { ref } from "vue";
export default {
  name: "chat",
  components: { msgItem },
  mixins: [window.mixin],
  setup() {
    const pageName = ref("信息")
    return {
      pageName,
    };
  },
  directives: {
    more: {
      mounted(element) {
        var startTx, startTy;
        element.addEventListener(
          "touchstart",
          function (e) {
                var operateBox = document.getElementById("operate-box"),
                touches = e.touches[0];
                startTx = touches.clientX;
                startTy = touches.clientY;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                // 控制菜单的位置
                operateBox.style.left =
                    (startTx - 18 > 250 ? 250 : startTx - 18) + "px";
                operateBox.style.top = element.offsetTop+ "px";
                operateBox.style.display = "block";
                element.style.backgroundColor = "#e5e5e5";
                }, 500);
            },
            false);
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
@import "../../assets/less/wechat.less";
</style>