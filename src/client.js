//import settings from "./settings"
/*import {io} from "socket.io-client"
var socket=io();
socket.on("connect",()=>{
    console.log(socket.id)
})*/
const CHAT={
    msgArr:[],
    
    /*logout:function(){
        socket.disconnect();
    },*/
    submit:function(obj){
       // socket.emit('sendMsg',obj);//触发事件
        
        CHAT.msgArr.push(obj)
    },
   /* message:function(username){
        this.socket.on('to'+username,function(obj){//事件被触发时调用的回调函数
            
        })
    },*/
    /* init:function(){
         socket=io.connect(settings.socket,{'force new connection':true})
         socket.on('open',function(){
           console.log('已连接')
         })
     }*/
}
export default CHAT