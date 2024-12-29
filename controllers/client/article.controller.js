const Article = require("../../model/article.model")

module.exports.index=async(req,res)=>{
    const articlesFeatured =await Article.find({
        deleted: false,
        featured:"1"
    })
    const articles =await Article.find({
        deleted: false,
        featured:"1"
    }).sort({
       ' createdBy.createdAt': 'desc'
    }).limit(6)
    res.render('client/pages/articles/index',{
        title:'Tạp chí thức ăn',
        articlesFeatured:articlesFeatured,
        articles:articles
    })
}