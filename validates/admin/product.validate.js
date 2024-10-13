module.exports.createPost=(req,res,next)=>{
    console.log(req.body.title)
    if(!req.body.title){
        req.flash('error', `Vui lòng nhập tiêu đề`);
        res.redirect(`back`);
        return;
    }
    if(req.body.title.length<1){
        req.flash('error', `Vui lòng nhập tiêu đề dài hơn 1 ký tự`);
        res.redirect(`back`);
        return;
    }
    next();
}
