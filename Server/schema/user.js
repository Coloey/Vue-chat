const { required } = require('joi')
const Joi=require('joi')
    //用户名验证
const username=Joi.string().alphanum().min(3).max(10).required()
    //密码验证规则,至少8个字符，至少1个字母，1个数字不能包含特殊字符：
const password=Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d]{8,}$/).required()
const id=Joi.number().integer().min(1).required()
const nickname=Joi.string().required()
const email=Joi.string().email().required()
//注册和登录表单的验证规则信息
exports.reg_login_schema={
    body:{
        username,
        password,
    }
}
//验证规则对象-更新用户基本信息
exports.update_userInfo_schema={
    body:{
        id,
        nickname,
        email
    }
}
exports.update_password_schema={
    body:{
        oldPassword:password,
        //joi.not(joi,ref('oldPassword'))表示newPassword的值不能和oldpassword的值一样，concat用来合并规则，使得新密码也要符合密码验证规则
        newPassword:Joi.not(Joi.ref("oldPassword")).concat(password)
    }

}