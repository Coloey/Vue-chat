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
    //修改个人信息
    getUserInfo(state,{data}){
        state.userInfo=data;
    }
    
}