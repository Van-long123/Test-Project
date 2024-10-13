const Account=require("../../model/account.model")
const md5 = require('md5');
// này là name trên header ở admin
module.exports.index=async(req,res)=>{
    res.render("admin/pages/my-account/index",
        {
            title:'Thông tin các nhân',
        }
    )
}
module.exports.edit=async(req,res)=>{
    res.render("admin/pages/my-account/edit",
        {
            title:'Chỉnh sửa thông tin các nhân',
        }
    )
}


module.exports.editPatch=async(req,res)=>{
    const id=res.locals.user.id;
    const existEmail=await Account.findOne({
        _id:{$ne:id},
        email:req.body.email,
        deleted:false
    })
    if(existEmail){
        req.flash('error', `Email ${req.body.email} đã tồn tại`);
        res.redirect(`back`)
        return;
    }
    else{
        if(req.body.password){
            req.body.password=md5(req.body.password)
        }
        else{
            delete req.body.password
            await Account.updateOne({_id:id},req.body)
            res.redirect('back')
        }
    }
}

