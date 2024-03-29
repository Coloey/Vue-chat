//const store=require("../src/store")
const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
app.use(cors());
//解析application/x-www-form-urlencoded数据
app.use(express.urlencoded({ extended: false }));
//在路由之前封装res.cc函数,中间件处理函数处理响应
app.use((req, res, next) => {
  res.cc = function (resData, status = 1) {
    res.send({
      status,
      message: resData instanceof Error ? resData.message : resData, //resData的值可能是一个错误对象也可能是一个描述字符串
    });
  };
  next();
});

//解析token的中间件
//api开头的接口都不需要进行token解析，配置成功了express-jwt这个中间件，可以把解析出来的用户信息挂载到req.user上
const expressJWT = require("express-jwt");
const config = require("./config");
app.use(
  expressJWT({
    secret: config.jwtSecrectKey,
    algorithms: ["HS256"],
  }).unless({ path: [/^\/api\//] })
);

//导入用户路由模块
const userRouter = require("./router/user");
app.use("/api", userRouter);
//导入并使用用户信息模块
const userInfoRouter = require("./router/userInfo");
app.use("/my", userInfoRouter);
//错误中间件
app.use(function (err, req, res, next) {
  //数据验证失败
  if (err instanceof Joi.ValidationError) return res.cc(err);
  if (err.name === "UnauthorizedError")
    return res.send({ status: 401, message: "登录已过期，请重新登录" });
  //未知错误
  res.cc(err);
});
const { createServer } = require("http");
const { on } = require("events");
const server = createServer(app);
const io = require("socket.io")(server, {
  //服务端配置cors
  cors: {
    origin: "https://coloey.github.io",
    // origin: "http://localhost:8081",
  },
});
let onlineUsers = {}; //存储在线用户的对象
//let onlineCount = 0;
let user = "";
io.on("connection", function (socket) {
  socket.emit("open");
  let toUser = "";
  let fromUser = "";
  let date = "";
  socket.on("addUser", function (username) {
    // eslint-disable-next-line no-prototype-builtins
    if (!onlineUsers[username]) {
      //onlineCount += 1;
      onlineUsers[username] = socket;
    }
    console.log(onlineUsers[username].id);
    console.log("onlineCount", Object.keys(onlineUsers).length);
  });
  socket.on("sendMsg", (obj) => {
    //console.log(obj);
    (toUser = obj.toUser), (fromUser = obj.fromUser);
    date = obj.date;
    if (toUser in onlineUsers) {
      //接收方
      onlineUsers[toUser].emit(toUser, obj); //两边都显示信息
      onlineUsers[fromUser].emit(fromUser, obj);
    } else if (fromUser in onlineUsers) {
      onlineUsers[fromUser].emit(fromUser, obj);
      console.log(toUser + "不在线");
    }
  });
  socket.on("sendPost", (obj) => {
    // console.log(obj);
    for (let username in onlineUsers) {
      // console.log(username);
      onlineUsers[username].emit("post" + username, obj);
    }
  });
  socket.on("disconnect", () => {
    console.log(`${socket.id}断开连接`);
    delete onlineUsers[fromUser];
  });
});

server.listen(3007, () => {
  console.log("run in http://127.0.0.1:3007");
});
