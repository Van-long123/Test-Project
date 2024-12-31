const Product=require("../../model/product.model");
const Comment=require("../../model/comment.model");
const User=require("../../model/user.model");
const ProductCategory=require("../../model/products-category.model");
const productsHelper=require("../../helpers/product");
const Order = require("../../model/order.model");

module.exports.detail=async(req,res)=>{
     const productsRandom = await Product.aggregate([
        { $match: { deleted: false, status: 'active' } },  // Lọc các bản ghi phù hợp
        { $sample: { size: 7 } }  // Lấy ngẫu nhiên 6 bản ghi
    ]);
    const slug=req.params.slugProduct
    const product=await Product.findOne({
        slug:slug,
        deleted:false,
        status:'active',
    })
    if(product.ratings){
        if(product.ratings.numberOfRatings){
            product.averageRating=(product.ratings.totalRating/product.ratings.numberOfRatings).toFixed(1)
        }
    }
    product.priceNew=productsHelper.priceNew(product)
    const comments=await Comment.find({
        product_id:product.id
    })
    for (const comment of comments) {
        const user = await User.findOne({
            _id: comment.user_id
        }).select('fullname');
    
        if(user){
            comment.fullname=user.fullname;
        }
        else{
            comment.fullname="No Name";
        }
    }

    const cartId=req.cookies.cartId;
    let hasCommented;
    let hasReviewed
    if(cartId){
        const order=await Order.findOne({
            cartId:cartId,
            'products.product_id':product.id
        }).sort({'createdBy.createdAt':'desc'})
        if(order){
            hasCommented=!order.hasCommented;
            hasReviewed=!order.hasReviewed;
           
        }
        else{
            hasReviewed=false;
            hasCommented=false;
        }
    }
    res.render("client/pages/detail/index",{
        title:product.slug,
        product:product,
        productsRandom:productsRandom,
        comments:comments,
        hasCommented:hasCommented,
        hasReviewed:hasReviewed
    });
}