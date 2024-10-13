const ProductCategory=require("../../model/products-category.model")
const Product=require('../../model/product.model')
const Account=require('../../model/account.model')
module.exports.index=async(req,res)=>{
    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0,
        },
    };
    statistic.categoryProduct.total=await ProductCategory.countDocuments({deleted:false})//khi truyền {}
    statistic.categoryProduct.active=await ProductCategory.countDocuments({deleted:false,status:"active"})//khi truy
    statistic.categoryProduct.inactive=await ProductCategory.countDocuments({deleted:false,status:"inactive"})//khi truy
    
    statistic.product.total=await Product.countDocuments({deleted:false})//khi truyền {}
    statistic.product.active=await Product.countDocuments({deleted:false,status:"active"})//khi truy
    statistic.product.inactive=await Product.countDocuments({deleted:false,status:"inactive"})//khi truy

    statistic.account.total=await Account.countDocuments({deleted:false})//khi truyền {}
    statistic.account.active=await Account.countDocuments({deleted:false,status:"active"})//khi truy
    statistic.account.inactive=await Account.countDocuments({deleted:false,status:"inactive"})//khi truy
    res.render('admin/pages/dashboard/index',{title:"Trang tổng quan",statistic:statistic})
}