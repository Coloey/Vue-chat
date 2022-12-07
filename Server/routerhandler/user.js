const db=require('../db/index')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

exports.register=(req,res)=>{
    //判断表单数据是否合法
    const userInfo=req.body
    //定义SQL语句
    const sql="select * from ev_users where username=?"
    db.query(sql,[userInfo.username],function(err,result){
        //执行SQL语句失败
        if(err){
            return res.cc(err)
        }
        //用户名被占用
        if(result.length>0){
            return res.cc('用户名被占用，请更换用户名')
        }
         //用户名可以使用,对密码进行加密,调用bcrypt.hashSync(明文密码,随机盐长度)
        userInfo.password=bcrypt.hashSync(userInfo.password,10)
        //console.log(userInfo)
        //注册新用户
        const sql="insert into ev_users set ?"
        db.query(sql,{username:userInfo.username,password:userInfo.password},(err,result)=>{
            if(err)return res.cc(err)
            if(result.affectedRows!==1){res.cc('注册用户失败，请稍后再试')}
            //注册用户成功
            res.cc("注册成功")
        })
    })
}
exports.login=(req,res)=>{
    const userInfo=req.body
    const sql='select * from ev_users where username=?'
    db.query(sql,userInfo.username,function(err,result){
        if(err)return res.cc(err)
        //执行SQL语句但是查询到的数据条数不等于1
        if(result.length!==1)return res.cc('用户名不存在!')
        //判断用户输入的登录密码是否和数据库中的密码一致
        if(!bcrypt.compareSync(userInfo.password,result[0].password)){
            return res.cc('密码错误')
        }
        //登录成功生成token响应给客户端
        //剔除密码头像等敏感信息
        const user={...result[0],password:"",user_pic:""}
        const config=require('../config')
        //令牌是凭据，为了保证安全问题，不应该将令牌保留超过所需的时间
        const tokenStr=jwt.sign(user,config.jwtSecrectKey,{expiresIn:'10h'})
        //将生成的token响应给客户端
        res.send({
            status:0,
            message:'登录成功',
            //为了方便客户端使用token，在服务器端先拼接上Bearer
            token:'Bearer '+tokenStr
        })
    })
}
exports.logout=(req,res)=>{
    res.cc("退出登录成功",201)
}