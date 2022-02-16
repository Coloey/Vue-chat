<template>
   <div id="search" :class="{'search-open':!$store.state.headerStatus}">
    <div class="weui-search-bar" id="search_bar" :class="{'weui-search-bar_focusing':!$store.state.headerStatus}">
      <form class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input type="search" v-model="searchIpt" class="weui-search-bar__input" id="search_input" placeholder="搜索" @focus="closeHeader"/>
          <a class="weui-icon-clear" v-on:click="searchIpt=''"></a>
        </div>
        <label for="search_input" class="weui-search-bar__label" id="search_text">
            <i class="weui-icon-search"></i>
            <span>搜索</span>
        </label>
      </form>
      <a class="weui-search-bar__cancel-btn" id="search_cancel" v-on:click="$store.commit('toggleHeaderStatus',true)">取消</a>
    </div>
   </div>
</template>

<script>
import { useStore } from 'vuex'
import {ref} from "vue"
export default {
    name: "search",
    setup(){
        let searchIpt=ref('')
        const store=useStore();
        const closeHeader=()=>{if(store.state.headerStatus)store.commit('toggleHeaderStatus',false)}
        return{
            searchIpt,
            closeHeader
        }
    }

}
</script>

<style lang="less">
@import "../../assets/less/search.less";
</style>