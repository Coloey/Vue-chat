import {createStore} from "vuex"
import contact from "./contacts"
import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"
import departments from "./departments"
export default createStore({
    state:{
        logining:true,
        newMsgCount:0,//新消息数量
        allContacts:contact.contacts,//所有联系人
        allDepartments:departments,
        currentPageName:"信息",//用于在header组件中显示当前页标题
        headerStatus: true,//显示true或者隐藏false header组件
        tipsStatus:false,//控制首页右上角菜单显示
        userInfo:{},
        msg:[
        ],  
        posts:[] 
              
    },
    mutations,
    actions,
    getters
})