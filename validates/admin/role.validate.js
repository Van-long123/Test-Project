module.exports.createPost=(req,res,next)=>{
    if(!req.body.title){
        req.flash('error', `Vui lòng nhập nhóm quyền`);
        res.redirect(`back`);
        return;
    }
    next();
}
module.exports.editPost=(req,res,next)=>{
    if(!req.body.title){
        req.flash('error', `Vui lòng nhập nhóm quyền`);
        res.redirect(`back`);
        return;
    }
    next();
}