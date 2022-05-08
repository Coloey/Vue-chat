# vue-test


## 概述

项目结果：仿照微信的校园版微信，主要用于学生和学校老师，行政人员之间的沟通，提高办事效率。有教师列表页面，通知页面，和个人页面，教师列表页面方便同学直接与相关教师沟通，通知页面方便教师和行政人员发布各种教学通知等，个人页面包括个人姓名班级联系方式等，设置里面的账号与安全可以用于更改密码

 技术栈：Vue3,Vuex,Vue-Router,Element-plus,soket.io，express,mysql

用node中的express搭建服务器,写接口，用mysql存储各个人员信息,用soket.io实现聊天功能，webpack打包项目，以及动态展示功能,有三个主页面：‘通讯录’和‘我’，支持修改密码，注册用户，一对一实时聊天，发表情包等功能，各个页面之间的跳转用vue-router实现，跳转使用路由懒加载，只会在第一次进入页面时才会获取这个函数，然后使用缓存数据。搭配使用Weui样式库。

项目难点：

1 实现实时聊天，soket.io的主要靠emit()和on()实现实时聊天，关键在于设计对话的数据结构，对话用一个对象保存，里面包含发送者姓名，接收者姓名，信息，将对话展示在对话页面中主要靠fromUser,toUser识别，我方对话：fromUser===username&&toUser===$router.query.name,对方对话：fromUser===$router.query.name&&toUser==username

服务端用一个onLineUsers对象存储登录的用户soket对象，属性为username，这样用onLineUsers[username]就可以获得不同的soket对象，进而实现触发与接收事件

2 Elment-plus里的el-upload实现上传图片功能，注意file-list是默认上传文件，因为要自定义，因此将其绑定fileList,实现响应式，而fileList实际上是一个包含name,uid,url等属性对象的数组，而我们需要的传给服务器的是一个ImageUrl数组，因此要取得fileList[i].url.

3 封装axios

（1）创建axios实例。当连续发送多次请求时用requstCount记录请求次数，只有在第一次请求加载loading，后面的请求要使requestCount++;Loading沿用之前的，之后每一个请求完成后，requestCount--,直到requestCount为0时才关闭loading.

设置headers中的Content-Type统一为'application/x-www-form-urlencoded'

(2)设置请求拦截器，showLoading,如果有token并且token有值时config..headers.Authorization=token，返回配置config

(3)设置响应拦截器。hideLoading,根据响应码去判断响应成功还是失败，响应成功执行一系列操作，比如存储用户信息和token等，再Promise.resolve()失败则显示相应失败原因，再Promise.reject()

(4)封装相关api,注意如果是POST请求，需要用qs对请求体参数进行序列化

### 预览地址

[]: https://coloey.github.io/Vue-chat/

## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


