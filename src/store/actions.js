export default{
    toggleMsgRead:({commit,state},id)=>{
       let i=state.msgList.baseMsg.findIndex(v=>v.id===id)
        if(state.msgList.baseMsg[i].read){
            return '';
        }
        else state.msgList.baseMsg[i].read=true   
       
        if (!state.msgList.baseMsg[i].quiet) {
          if (state.msgList.baseMsg[i].read) {
            commit('minusNewMsg',i);
          } else {
            commit('addNewMsg',i);
          }
        }
    },
    deleteMsgEvent:({commit,state},id)=>{
      let i=state.msgList.baseMsg.findIndex(v=>v.id===id)
        if (!state.msgList.baseMsg[i].quiet && !state.msgList.baseMsg[i].read) {
          commit('minusNewMsg',i);
          return true;
        }else return false
    },
   
} 
