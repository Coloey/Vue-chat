import axios from 'axios'
import {ElLoading,ElMessage} from 'element-plus'
import router from "../router"
import store from "../store"
//const pendingMap=new Map();
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//创建一个axios实例
var instance=axios.create({
    baseURL:"http://127.0.0.1:3007",
    timeout: 10000,//设置超时
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
    }

})
let loading;
//多次请求时
let requestCount=0;
//显示Loading
const showLoading=()=>{
    if(requestCount===0&&!loading){
        loading=ElLoading.service({
            text:'Loading',
            background:'rgba(0,0,0,0.7)',
            spinner:'el-icon-loading',
        })
    }
    requestCount++;
}
//隐藏loading
const hideLoading=()=>{
    requestCount--;
    if(requestCount===0){
        loading.close()
    }
}
//请求拦截器
instance.interceptors.request.use((config)=>{
    showLoading()
    //每次发送请求前判断是否存在token如果存在则在header加上token
    const token=window.localStorage.getItem('token');
    token&&(config.headers.Authorization=token)
    //若请求方式为post，则将data数据转为json字符串
    // console.log(config.method)
    //  if(config.method=='post'){     
    //      config.data=JSON.stringify(config.data);
      
    //  }
    return config;
},(error)=>{
    Promise.reject(error);
})


//响应拦截器
instance.interceptors.response.use((response)=>{
    hideLoading()
    //响应成功
    console.log('拦截器报错')
    console.log(response)
    const status=response.data.status;
    if(status!=1){
        switch(status){
            case 0: //响应成功后如果是登录成功有token把token存储在本地
                if(response.data.token!=undefined)window.localStorage.setItem('token',response.data.token);
                break;
            case 200://获取用户信息成功后存储在state里
                console.log(response.data);
                store.commit("getUserInfo",response.data);
                break;
            case 401://登录过期跳转到登录页面
            case 201://退出登录清空token跳转登录页面
                //const router=useRouter();
                window.localStorage.removeItem('token');
                router.push("/login");  
        }
        if(response.data.message)ElMessage.success(response.data.message)           
        return Promise.resolve(response); 
    }
     else {       
        ElMessage.error(response.data.message);            
        return Promise.reject(response);        
    }
     
    //return response.data;
},(error)=>{
    console.log(error);
    //响应错误
    if(error.response&&error.response.status){
        let message=""
        const status=error.response.status
        switch(status){
            case 400:message="用户名不存在";break;
            case 402:message="身份认证失败";break;
            case 405:message="数据验证失败";break;
        }
        ElMessage.error(message);
        return Promise.reject(error)

    }
    return Promise.reject(error);

})
export default instance;