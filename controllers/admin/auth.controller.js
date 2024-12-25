const Account=require("../../model/account.model")
const systemConfig=require("../../config/system");
const md5 = require('md5');
module.exports.login=async(req,res)=>{
    if(req.cookies.token){
        const user=await Account.findOne({token:req.cookies.token})
        if(user){
            res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
        }
        else{
            res.clearCookie('token')
            res.redirect("admin/pages/auth/login")
        }
    }
    else{
        res.render("admin/pages/auth/login",
            {
                title:'Đăng nhập',
            }
        )
    }
}
module.exports.loginPost=async(req,res)=>{
    const {email,password}=req.body;
    const user=await Account.findOne({email:email,deleted:false})
    if(!user){
        req.flash('error', `Email không tồn tại`);
        req.flash('emailValue', req.body.email);
        res.redirect('back')
        return;
    }
    if(md5(password)!=user.password){
        req.flash('error', `Sai mật khẩu`);
        req.flash('emailValue', req.body.email);
        res.redirect('back')
        return;
    }
    if(user.status!='active'){
        req.flash('error', `Tài khoản đã bị khóa`);
        res.redirect('back')
        return;
    }
    res.cookie('token',user.token)
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}
module.exports.logout=(req,res)=>{
    res.clearCookie('token')
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}