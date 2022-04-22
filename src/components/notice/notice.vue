<template>
<div id="moments">
    <div style="position: absolute;top: 3%;right: 3%;z-index: 3;">
          <router-link to="/notice/post" class="iconfont icon-tips-xiaoxi"></router-link>     
    </div>
    <div class="weui-tab_content" v-for="(item1,index1) in $store.state.posts" :key="index1">
        <div class="cell ">
            <div class="weui-cell_hd">
                <img class="header" :src="item1.headerUrl" alt="">
                <p class="name">{{item1.fromUser}}</p>
            </div>
            <div class="weui-cell_bd">
                <p class="textValue">{{item1.textValue}}</p>
                <ul class="figure-list">
                    <li  v-for="(item2,index2) in item1.ImageUrl" :key="index2">
                      <img :src="item2" alt="">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CHAT from "../../client"
import {onMounted} from "vue"
import {useStore} from "vuex"
export default {
    setup(){
        const store=useStore();
        onMounted(()=>{
             CHAT.post(store.state.userInfo.username)
        })
       
    }

}
</script>

<style lang="less">
 @import "../../assets/less/moment.less";

</style>