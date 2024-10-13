const mongoose = require('mongoose')
const slug=require('mongoose-slug-updater')
mongoose.plugin(slug)
const productSchema=new mongoose.Schema({
    title:String,
    description:String,
    stock:Number,
    price:Number,
    discountPercentage:Number,
    thumbnail:String,
    status:String,
    featured:String,
    position:Number,
    product_category_id:String,
    slug:{
        type:String,
        slug:"title",
        unique:true,
    },
    createdBy:{
        account_id:String,
        createdAt:{
            type:Date,
            default:Date.now,
        }
    },
    deleted:{
        type:Boolean,
        default:false,
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
},
)
const Product=mongoose.model('Product',productSchema,'products')
module.exports=Product