export default{
    toggleMsgRead:({commit,state},toUser)=>{
       let i=state.msg.findIndex(v=>v.name===toUser)
        if(state.msg[i].read){
            return '';
        }
        else state.msg[i].read=true   
       
        if (!state.msg[i].quiet) {
          if (state.msg[i].read) {
            commit('minusNewMsg',i);
          } else {
            commit('addNewMsg',i);
          }
        }
    },
    /*deleteMsgEvent:({commit,state},id)=>{
      let i=state.msgList.baseMsg.findIndex(v=>v.id===id)
        if (!state.msgList.baseMsg[i].quiet && !state.msgList.baseMsg[i].read) {
          commit('minusNewMsg',i);
          return true;
        }else return false
    },*/
    getUserInfo({commit,state}){
      if(JSON.stringify(state.userInfo)==="{}"){
        //console.log(window.localStorage.getItem("userInfo").data)
        commit('saveUserInfo',JSON.parse(window.localStorage.getItem("userInfo")));
      }
    }  
} 
