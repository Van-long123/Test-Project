const mongoose= require('mongoose')
const slug =require('mongoose-slug-updater')
mongoose.plugin(slug)
const articleSchema=new mongoose.Schema({
    title:String,
    shortDescription:String,
    content:String,
    thumbnail:String,
    status:String,
    featured:String,
    position:Number,
    article_category_id:String,
    slug:{
        type:String,
        slug:'title',
        unique:true
    },
    deleted:{
        type:Boolean,
        default:false
    },
    createdBy:{
        account_id:String,
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    deleteBy:{
        account_id:String,
        deletedAt:Date
    },
    updatedBy:[
        {
            account_id:String,
            updatedAt:Date
        }
    ]

})
const Article = mongoose.model('Article',articleSchema,'articles')
module.exports= Article