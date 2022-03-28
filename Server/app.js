const express=require('express');
const cors=require('cors')
const app=express();
const Joi=require('joi')
app.use(cors())
//解析application/x-www-form-urlencoded数据
app.use(express.urlencoded({extended:false}))
//在路由之前封装res.cc函数,中间件处理函数处理响应
app.use((req,res,next)=>{
    res.cc=function(resData,status=1){
        res.send({
            status,
            message:resData instanceof Error ? resData.message :resData,//resData的值可能是一个错误对象也可能是一个描述字符串
        })
    }
    next()
})

//解析token的中间件
const expressJWT=require('express-jwt')
const config=require('./config')
app.use(expressJWT({
    secret:config.jwtSecrectKey,
    algorithms:['HS256'],
}).unless({path:[/^\/api\//]}))

//导入用户路由模块
const userRouter=require('./router/user')
app.use('/api',userRouter)
//导入并使用用户信息模块
const userInfoRouter=require('./router/userInfo')
app.use('/my',userInfoRouter)
//错误中间件
app.use(function(err,req,res,next){
    //数据验证失败
    if(err instanceof Joi.ValidationError)return res.cc(err)
    if(err.name==="UnauthorizedError")return res.send({status:401,message:"身份认证失败"})
    //未知错误
    res.cc(err)
})
app.listen(3007,()=>{
    console.log('run in http://127.0.0.1:3007')
})