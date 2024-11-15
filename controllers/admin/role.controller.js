const Role=require('../../model/role.model')
const systemConfig=require('../../config/system')
module.exports.index=async(req,res)=>{
    let find={
        deleted:false,
    }
    const records=await Role.find(find)
    res.render('admin/pages/roles/index',{
        title:'Nhóm quyền',
            records:records
    })
}
module.exports.create=(req,res)=>{
    res.render('admin/pages/roles/create',{
        title:'Tạo nhóm quyền'
    })
}
module.exports.createPost=async(req,res)=>{
    const permissions=res.locals.role.permissions
    if(!permissions.includes("roles_create")){
        return;
    }
    const record=new Role(req.body)
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
module.exports.edit=async(req,res)=>{
    try {
        const id=req.params.id
        const record=await Role.findOne({_id:id,deleted:false})
        res.render('admin/pages/roles/edit',{
        title:'Cập nhật nhóm quyền',
        record:record
        })
    } catch (error) {
        req.flash('error','Nhóm ko tồn tại')
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}
module.exports.editPost=async(req,res)=>{
    const permissions=res.locals.role.permissions
    if(!permissions.includes("roles_create")){
        return;
    }
    await Role.updateOne({_id:req.params.id},req.body)
    req.flash('success', `Cập nhật nhóm quyền thành công`);
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
module.exports.deleteItem=async(req,res)=>{
    const permissions=res.locals.role.permissions
    if(!permissions.includes("roles_delete")){
        req.flash('error', 'Bạn ko có quyền xóa nhóm');
        res.redirect('back');
        return;
    }
    const id=req.params.id
    await Role.updateOne({_id:id},{deleted:true,deletedAt:new Date()})
    req.flash('success','Đã xóa sản phẩm thành công')
    res.redirect('back')
}
module.exports.permissions=async (req,res)=>{
    let find={
        deleted:false
    }
    const records =await Role.find(find)
    res.render("admin/pages/roles/permissions",{
        title:"Phân quyền",
        records:records
    })
}
module.exports.permissionsPatch=async (req,res)=>{
    const rolePermissions=res.locals.role.permissions
    if(!rolePermissions.includes("roles_permissions")){
        return;
    }
    console.log(req.body.permissions)
    const permissions=JSON.parse(req.body.permissions)
    for (const permission of permissions) {
        await Role.updateOne({_id:permission.id},{permissions:permission.permissions})
    }
    req.flash("success","Cập nhật phân quyền thành công")
    res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`)
}