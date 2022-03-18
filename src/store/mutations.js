//import contact from "./contacts"
export default{
    setPageName(state,name){
        state.currentPageName=name
    },
    changeLastMsg(state,{lastMsg,id}){
        //console.log( state.msgList.baseMsg)
        state.msgList.baseMsg.forEach(v=>{v.id==id?v.lastMsg=lastMsg:v.lastMsg={}})   
    },
    toggleTipsStatus(state, status) {
        if (status == -1) {
            state.tipsStatus = false
        } else {
            state.tipsStatus = !state.tipsStatus
        }
    },
    //当search组件全屏或非全屏时切换公共头部
    toggleHeaderStatus(state,status){
        state.headerStatus=status
    },
    addNewMsg(state,i){
        //console.log("add被调用")
        state.newMsgCount>99?state.newMsgCount="99+":state.newMsgCount+=state.msgList.baseMsg[i].newMsgCount;
    },
    //减少未读信息
    minusNewMsg(state,i){
        state.newMsgCount<1?state.newMsgCount=0:state.newMsgCount-=state.msgList.baseMsg[i].newMsgCount
    },
    loginSuccess(state){
        state.logining=false
    },
    //增加最近联系人
   /* addLatestContact(state,{id,obj}){
        //如果基本联系人里面包含这个人，则直接返回
        if((state.msgList.baseMsg.findIndex(v=>v.id===id))!==-1)return;
        let newContact=state.allContacts.find(v=>v.id==id);
        newContact={
            ...newContact,
            "read":true,
            "quite":false,
            "newMsgCount":0,
            "user":contact.getUserInfo(id),
            "msg":[],
            "lastMsg":obj[obj.length-1]
  
        }
        state.msgList.baseMsg.unshift(newContact);
    }*/
     

}