<template>
<div :classclass="departments">
     <header id="wx-header">
          <div class="center">
              <router-link  to="/contact" tag="div" class="iconfont icon-return-arrow">
              <span>通讯录</span>
              </router-link>
              <span>部门</span>
          </div>
      </header>
      <search></search>
      <section>
          <template v-for="(value,key) in departmentsList" :key="key">
              <!-- 首字母 -->
              <div class="weui-cells__title">{{key}}</div>
              <div class="weui-cells">
                  <div class="weui-cell weui-cell_access" v-for="(item,index) in value" :key="index">
                      <div class="weui-cell_bd"><a href="javascript:;">{{item.name}}</a></div>
                  </div>
              </div>
          </template>
      </section>
</div>
</template>

<script>
import {computed} from "vue"
import {useStore} from "vuex"
import search from "../common/search.vue"
export default {
    name:"department",
    components:{search},
    setup(){
        const store=useStore()
        const departmentsList=computed(()=>{
            return store.getters.departmentsList
        })
        return {
            departmentsList,
        }

    }

}
</script>

<style>
.departments {
    padding-top: 20px;
}
.departments .weui-cell_access:active {
        background-color: rgba(177, 177, 177, 0.53)
    }

</style>