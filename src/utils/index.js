import axios from "axios";
import { ElLoading, ElMessage } from "element-plus";
import router from "../router";
import store from "../store";
import CHAT from "../client";
//创建一个axios实例
var instance = axios.create({
  baseURL: "http://127.0.0.1:3007",
  timeout: 10000, //设置超时
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
let loading;
//多次请求时 z
let requestCount = 0;
//显示Loading
const showLoading = () => {
  if (requestCount === 0 && !loading) {
    //第一次发送请求并且没有loading加载loaing
    loading = ElLoading.service({
      text: "Loading",
      background: "rgba(0,0,0,0.7)",
      spinner: "el-icon-loading",
    });
  }
  requestCount++; //多次请求
};
//隐藏loading
const hideLoading = () => {
  requestCount--;
  if (requestCount === 0) {
    loading.close(); //直到请求都结束Loading才关闭
  }
};
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    showLoading();
    //每次发送请求前判断是否存在token如果存在则在header加上token
    const token = window.localStorage.getItem("token");
    token && (config.headers.Authorization = token);

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//响应拦截器
instance.interceptors.response.use(
  (response) => {
    hideLoading();
    //响应成功
    const status = response.data.status;
    if (status != 1) {
      //策略模式
      let stragtegy = {
        0: function (res) {
          //响应成功后如果是登录成功有token把token存储在本地
          if (res.data.token !== undefined)
            window.localStorage.setItem("token", res.data.token);
        },
        200: function (res) {
          //获取用户信息成功后存储在localStorage里和store
          store.commit("saveUserInfo", res.data.data);
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(res.data.data)
          );
        },
        401: function () {
          //登录过期,清空token,跳转到登录页面
          console.log("1");
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("userInfo");
          CHAT.logout();
          router.push("/login");
        },
        201: function () {
          //退出登录清空token,跳转登录页面
          window.localStorage.removeItem("token");
          const userInfo = window.localStorage.getItem("userInfo");
          if (userInfo) {
            CHAT.logout();
            window.localStorage.removeItem("userInfo");
          }
          router.push("/login");
        },
      };
      stragtegy[status] && stragtegy[status](response);
      if (response.data.message) ElMessage.success(response.data.message);
      return Promise.resolve(response);
    } else {
      ElMessage.error(response.data.message);
      return Promise.reject(response);
    }
  },
  (error) => {
    let stragtegy = {
      500: function () {
        return "服务器错误(500)";
      },
      501: function () {
        return "服务未实现(501)";
      },
      502: function () {
        return "网络错误(502)";
      },
      503: function () {
        return "服务不可用(503)";
      },
      504: function () {
        return "网络超时(504)";
      },
      505: function () {
        return "HTTP版本不受支持(505)";
      },
    };
    //响应错误
    if (error.response && error.response.status) {
      const status = error.response.status;
      let message =
        (stragtegy[status] && stragtegy[status]()) || `连接出错(${status})!`;
      ElMessage.error(message);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
export default instance;
