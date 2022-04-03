<template>
    <div id="contact">
        <!-- 部门 -->
        <section>
            <div class="weui-cells_contacts-head weui-cells weui-cells_access" style="margin-top:-1px">
                <router-link to="/contact/department" class="weui-cell">
                    <div class="weui-cell_hd"><img src="../../assets/images/contact_department.png" alt=""></div>
                    <div class="weui-cell_bd weui-cell_primary"><p>部门</p></div>
                </router-link>
            </div>
        </section>
        <section>
             <!-- 联系人集合 -->
             <template v-for="(value,key) in contactsList" :key="key">
                 <!-- 首字母 -->
                <div :ref="`key_${key}`" class="weui-cells__title">{{key}}</div>
                <div class="weui-cells">
                    <router-link 
                        :key="item.id" 
                        :to="{
                            path:'/contact/details',
                            query:{id:item.id}}"
                        class="weui-cell weui-cell_access" 
                        v-for="item in value" tag="div">
                        <div class="weui-cell__hd">
                            <img :src="item.headerUrl" class="home__mini-avatar___1nSrW">
                        </div>
                        <div class="weui-cell__bd">
                            {{item.nickname}}
                        </div>
                    </router-link>
                </div>
             </template>
        </section>
        <div class="initial-bar"><span @click="toPs(i)" :key="i" v-for="i in contactsInitialList">{{i}}</span></div>
    </div>
</template>

<script>
import { computed, onActivated, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import {ref} from "vue"
export default {
    mixins:[window.mixin],
    setup(){
        const pageName=ref("通讯录")
        const store=useStore()
        onMounted(()=>{
            store.commit("toggleTipsStatus",-1)

        })
        onActivated(()=>{
            store.commit("toggleTipsStatus", -1)
        })
        const contactsInitialList=computed(()=>store.getters.contactsInitialList)
        const contactsList=computed(()=>store.getters.contactsList)
       // console.log(contactsInitialList.value)
        return {
            pageName,
            contactsInitialList,
            contactsList
        }
        
    },
     methods: {
            toPs(i) {
                window.scrollTo(0, this.$refs['key_' + i][0].offsetTop)
            }
        }
}
</script>

<style lang="less">
 @import "../../assets/less/contact.less";
</style>