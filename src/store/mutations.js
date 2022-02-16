export default{
    setPageName(state,name){
        state.currentPageName=name
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
    addNewMsg(state,id){
        //console.log("add被调用")
        state.newMsgCount>99?state.newMsgCount="99+":state.newMsgCount+=state.msgList.baseMsg[id].newMsgCount;
    },
    //减少未读信息
    minusNewMsg(state,id){
        state.newMsgCount<1?state.newMsgCount=0:state.newMsgCount-=state.msgList.baseMsg[id].newMsgCount
    },
}