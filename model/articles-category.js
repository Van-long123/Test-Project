const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug)
const articleCategory=new mongoose.Schema({
    title:String,
    description:String,
    thumbnail:String,
    status:String,
    position:Number,
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
            default:Date.now,
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
const ArticleCategory = mongoose.model('ArticleCategory',articleCategory,'articles-category')
module.exports=ArticleCategory