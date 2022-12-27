import { io } from "socket.io-client";
import store from "../src/store";

let socket = io();
const CHAT = {
  username: null,
  date: null,
  init: function (username, flush = false) {
    socket = io("http://127.0.0.1:3007", {
      "force new connection": true,
    });
    socket.on("open", function () {
      console.log("已连接");
      //console.log(`client:${socket.connected}`);
      if (flush) {
        socket.on(username, function (obj) {
          console.log("CHAT.msgArr", obj);
          store.commit("ChangeMsg", obj);
        });
        flush = false;
      }
    });
    socket.emit("addUser", username);
  },

  logout: function () {
    if (socket) {
      socket.disconnect();
      socket.close();
    }
  },
  scrollToBottom: function () {
    window.scrollTo(0, 900000);
  },
  sendPost: function (obj) {
    socket.emit("sendPost", obj); //触发发送朋友圈事件
  },
  submit: function (obj) {
    console.log("submit");
    socket.emit("sendMsg", obj); //触发事件
  },
  message: function (username) {
    socket.on(username, function (obj) {
      console.log("CHAT.msgArr", obj);
      store.commit("ChangeMsg", obj);
    });
  },
  post: function (username) {
    socket.on("post" + username, function (obj) {
      console.log("UploadPost:", obj);
      store.commit("UploadPost", obj);
    });
  },
};
export default CHAT;
