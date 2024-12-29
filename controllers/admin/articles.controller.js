const Article = require("../../model/article.model");
const fillterStatusHelper=require('../../helpers/fillterStatusHelper')
const searchHelper=require('../../helpers/search')
const pagination=require('../../helpers/pagination')
module.exports.index= async (req,res)=>{
    let find={
        deleted:false
    }
    const fillterStatus=fillterStatusHelper(req.query)
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
    const countArticles=await Article.countDocuments(find)
    const objectPagination=pagination(req.query,countArticles,{
        currentPage:1,
        limitItems:7
    })
    const records=await Article.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
    res.render('admin/pages/articles/index',{
        title:"Danh sách bài viết",
        records:records,
        fillterStatus:fillterStatus,
        keyword:objectSearch.keyword,
        pagination:objectPagination,
    })
}