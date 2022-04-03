//import settings from "./settings"
import {io} from "socket.io-client"
import store from "../src/store"
let socket=io();
const CHAT={
    msgArr:[],
    username:null,
    
    init:function(username){
        socket=io.connect("http://127.0.0.1:3007",{'force new connection':true})
        socket.on('open',function(){
          console.log('已连接')
        })

        socket.emit('addUser',username)
             
   },
    logout:function(){
        socket.disconnect();
    },
    scrollToBottom:function(){
        window.scrollTo(0,900000)
    },
    submit:function(obj){
        console.log('submit');   
        socket.emit('sendMsg',obj);//触发事件
    },
    message:function(username){
        socket.on(username,function(obj){//事件被触发时调用的回调函数
            //CHAT.msgArr.push(obj)
            console.log('CHAT.msgArr',obj)
            store.commit('ChangeMsg',obj);
            
         })
    },
    
}
export default CHAT