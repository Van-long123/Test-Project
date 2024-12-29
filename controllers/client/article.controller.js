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
module.exports.detail=async(req,res)=>{
    try {
        const article=await Article.findOne({
            deleted:false,
            slug:req.params.slug
        })
        const articles =await Article.find({
            deleted: false,
            featured:"1"
        }).sort({
           ' createdBy.createdAt': 'desc'
        }).limit(6)
        const slug=req.params.slug
        res.render('client/pages/articles/detail',{
            title:article.title,
            articles:articles,
            article:article
        })
    } catch (error) {
        res.redirect('back')
    }
}