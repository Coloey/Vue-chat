export default{
    toggleMsgRead:({commit,state},id)=>{
        if(state.msgList.baseMsg[id].read){
            return '';
        }
        else state.msgList.baseMsg[id].read=true   
       
        if (!state.msgList.baseMsg[id].quiet) {
          if (state.msgList.baseMsg[id].read) {
            commit('minusNewMsg',id);
          } else {
            commit('addNewMsg',id);
          }
        }
    },
    deleteMsgEvent:({commit,state},id)=>{
        if (!state.msgList.baseMsg[id].quiet && !state.msgList.baseMsg[id].read) {
          commit('minusNewMsg',id);
          return true;
        }else return false
    }
} 
