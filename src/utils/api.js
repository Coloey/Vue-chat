//import { JsonWebTokenError } from "jsonwebtoken"
import axios from "./request"
import qs from "qs"
export const login=(data)=>{
    //data=JSON.stringify(data)
    return axios({
        url:'/api/login',
        method:'post',
        data:qs.stringify(data),
         
    })
}
export const register=(data)=>{
    return axios({
        url:'/api/register',
        method:'post',
        data:qs.stringify(data)
    })
}
export const logout=()=>{
    return axios({
        url:'/api/logout',
        method:'post',
    })
}
export const getUserInfo=()=>{
    return axios({
        url:'/my/getUserInfo',
        method:'get',
        

    })
}
export const updatePassword=(data)=>{
    return axios({
        url:'/my/updatePassword',
        method:'post',
        data:qs.stringify(data)
    })
}