module.exports.comment=(req,res,next)=>{
    if(!req.body.content){
        req.flash('error', `Vui lòng nhập nội dung`);
        res.redirect(`back`);
        return;
    }
    next();
}
