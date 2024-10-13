const mongoose = require('mongoose')
const commentSchema=new mongoose.Schema({
    product_id:String,
    user_id:String,
    content:String
},
{
    timestamps:true
})
const Comment=mongoose.model('Comment',commentSchema,'comments');
module.exports =Comment