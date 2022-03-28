const db=require('../db/index')
const bcrypt=require('bcryptjs')
exports.userInfo=(req,res)=>{
    const sql="select id,username,nickname,email,user_pic,class from ev_users where id=?"
    db.query(sql,[req.user.id],(err,result)=>{
        if(err)return res.cc(err)
        if(result.length!==1)return res.rcc("获取用户信息失败")
        res.send({status:200,data:result[0]})
    })
}
exports.updateUserInfo=(req,res)=>{
    const userInfo=req.body
    const sql="update ev_users set ? where id=?"
    db.query(sql,[userInfo,userInfo.id],(err,result)=>{
        if(err)return res.cc(err)
        if(result.affectedRows!==1)return res.cc("更新用户信息失败")
        res.send({status:0,message:"更新用户信息成功",data:result[0]})
    })

}
exports.updatePassword=(req,res)=>{
    //const userInfo=req.body
    //根据id查询用户是否存在
    const sql="select * from ev_users where id= ?"
    db.query(sql,req.user.id,(err,result)=>{
        if(err)return res.cc(err)
        //检查指定id的用户是否存在
        if(result.length!==1)return res.cc('用户不存在!')
        //判断提交的旧密码是否正确
        if(!bcrypt.compareSync(req.body.oldPassword,result[0].password)){
            return res.cc('旧密码错误')
        }
        //旧密码验证成功后更新密码
        //对新密码进行加密处理
        const newPassword=bcrypt.hashSync(req.body.newPassword,10)
        const sql="update ev_users set password=? where id= ?"
        db.query(sql,[newPassword,req.user.id],(err,result)=>{
            if(err)return res.cc(err)
            if(result.affectedRows!==1)return res.cc("更新用户密码失败")
            res.send({status:0,message:"更新用户密码成功",data:result[0]})
        })
    })
}