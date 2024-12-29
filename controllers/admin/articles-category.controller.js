const ArticleCategory = require("../../model/articles-category")
const fillterStatusHelper=require('../../helpers/fillterStatusHelper')
const searchHelper=require('../../helpers/search')
const pagination=require('../../helpers/pagination')
const systemConfig=require('../../config/system')

const Account = require("../../model/account.model")
module.exports.index=async (req,res)=>{
    let find={
        deleted:false
    }
    let fillterStatus=fillterStatusHelper(req.query)
    if(req.query.status){
        find.status=req.query.status
    }
    const objectSearch=searchHelper(req.query)
    if(req.query.keyword){
        find['$or']=[
            {title:objectSearch.regex},
            {slug:objectSearch.slugRegex}
        ]
    }
    let sort={}
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey]=req.query.sortValue
    }
    else{
        sort.position='desc'
    }
    const countCategories=ArticleCategory.countDocuments(find)
    const objectPagination=pagination(req.query,countCategories,{
        currentPage:1,
        limitItems:7
    })
    const records=await ArticleCategory.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

    for (const record of records) {
        const user=await  Account.findOne({
            _id:record.createdBy.account_id
        })
        if(user){
            record.fullName=user.fullname
        }
        const updateBy=record.updatedBy[record.updatedBy.length-1]
        if(updateBy){
            const userUpdate=await Account.findOne({
                _id:updateBy.account_id
            })
            if(userUpdate){
                updateBy.accountFullName=userUpdate.fullname
            }
        }
    }
    res.render('admin/pages/articles-category/index',{
        title:"Danh mục bài viết",
        keyword:objectSearch.keyword,
        records:records,
        pagination:objectPagination,
        fillterStatus:fillterStatus
    });
}
module.exports.changeStatus=async (req,res)=>{
    const id=req.params.id
    const status=req.params.status
    const updatedBy={
        account_id:res.locals.user.id,
        updatedAt:Date.now()
    }
    await ArticleCategory.updateOne({
        _id:id
    },{
        status:status,$push:{updatedBy:updatedBy}
    })
    
    req.flash('success', 'Cập nhật trạng thái danh mục bài viết thành công');
    res.redirect('back');
}
module.exports.deleteItem=async (req,res)=>{
    const id=req.params.id
    const deletedBy={
        account_id:res.locals.user.id,
        deletedAt:Date.now()
    }
    await ArticleCategory.updateOne({
        _id:id
    },{
        deleted:true,
        deletedBy:deletedBy
    })
    req.flash('success', 'Đã xóa thành công danh mục bài viết');
    res.redirect('back');
}
module.exports.changeMulti=async (req,res)=>{
    const type=req.body.type;
    const ids=req.body.ids.split(', ');
    const updatedBy={
        account_id:res.locals.user.id,
        updatedAt:Date.now()
    }
    switch (type) {
        case 'active':
            await ArticleCategory.updateMany({
                _id:{$in:ids}
            },{
                status:'active',$push:{updatedBy:updatedBy}
            })
            req.flash('success', `Cập nhật trạng thái thành công ${ids.length} danh mục`);
            break;
        case 'inactive':
            await ArticleCategory.updateMany({
                _id:{$in:ids}
            },{
                status:'inactive',$push:{updatedBy:updatedBy}
            })
            req.flash('success', `Cập nhật trạng thái thành công ${ids.length} danh mục`);
            break;
        case 'delete-all':
            deletedBy={
                account_id:res.locals.user.id,
                deletedAt:Date.now()
            }
            await ArticleCategory.updateMany({
                _id:{$in:ids}
            },{
                deleted:true,deletedBy:deletedBy
            })
            req.flash('success', `Xóa thành công ${ids.length} danh mục`);
            break;
        case 'change-position':
            for (const item of ids) {
                const [id,position]=item.split('-')
                await ArticleCategory.updateOne({
                    _id:id
                },{
                    position:position,$push:{updatedBy:updatedBy}
                })
            }
            req.flash('success', `Đã đổi vị trí thành công ${ids.length} danh mục`);
            break;
        default:
            req.flash('error', `Ko nằm trong danh sách hãy chọn lại`);
            break;
            
    }
    res.redirect('back')
}
module.exports.detail=async (req,res)=>{
    const id=req.params.id
    try {
        const articlesCategory=await ArticleCategory.findOne({
            _id:id,
        })

        res.render('admin/pages/articles-category/detail',{
            title:articlesCategory.title,
            articlesCategory:articlesCategory
        })
    } catch (error) {
        req.flash('error', 'Danh mục không tồn tại');
        res.redirect('back');
    }
}
module.exports.create=async (req,res)=>{
    res.render('admin/pages/articles-category/create',{
        title:'Tạo danh mục bài viết',
    })
}
module.exports.createPost=async (req,res)=>{


    if(req.body.position==''){
        const count=await ArticleCategory.countDocuments({})
        req.body.position=count+1
    }
    else{
        req.body.position=parseInt(req.body.position)
    }
    const createdBy={
        account_id:res.locals.user.id,
        createdAt:Date.now()
    }
    req.body.createdBy=createdBy
    const articlesCategory=new ArticleCategory(req.body)
    await articlesCategory.save()
    req.flash('success', `Đã thêm thành công danh mục bài viết`);
    res.redirect(`${systemConfig.prefixAdmin}/articles-category`)
}

module.exports.edit=async (req,res)=>{
    try {
        const id=req.params.id;
        const articlesCategory= await ArticleCategory.findOne({
            _id:id,
            deleted:false
        })
        res.render('admin/pages/articles-category/edit',{
            title:'Tạo danh mục bài viết',
            record:articlesCategory
        })
    } catch (error) {
        
    }
}
module.exports.editPatch=async (req,res)=>{
    try {
        if(req.body.position==''){
            const count=await ArticleCategory.countDocuments({})
            req.body.position=count+1
        }
        else{
            req.body.position=parseInt(req.body.position)
        }
        const updatedBy={
            account_id:res.locals.user.id,
            updatedAt:Date.now()
        }
        await ArticleCategory.updateOne({
            _id:req.params.id
        },{
            ...req.body,$push:{updatedBy:updatedBy}
        })
        req.flash('success', `Cập nhật thành công danh mục`);
        res.redirect(`back`)
    } catch (error) {
        
    }
}