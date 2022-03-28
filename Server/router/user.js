const express=require('express')
const router=express.Router()
const user_handler=require('../routerhandler/user')
const expressJoi=require('@escook/express-joi')
//导入需要的验证规则对象
const {reg_login_schema}=require('../schema/user')
//数据验证通过后会把这次请求流转给后面的路由处理函数
//数据验证失败后，终止后续代码的执行，并抛出一个全局的Error错误。进入全局错误级别中间件进行处理
router.post('/register',expressJoi(reg_login_schema),user_handler.register)
router.post('/login',expressJoi(reg_login_schema),user_handler.login)
router.post('/logout',user_handler.logout)
module.exports=router
