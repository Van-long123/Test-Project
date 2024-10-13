const ProductCategory=require("../../model/products-category.model");
const Product=require("../../model/product.model");
const User=require("../../model/user.model");
const Comment=require("../../model/comment.model");
const searchHelper=require("../../helpers/search")
const productsHelper=require("../../helpers/product");
const paginationHelper=require("../../helpers/pagination");
module.exports.index=async(req,res)=>{
    let find={
        deleted:false,
        status:'active'
    }
    //Search
    let search=""
    if(req.query.search){
        search=(req.query.search).trim();
        find.title=new RegExp(search,'i')
    }
    //end search
    //  Pagination 
    const countProducts=await Product.countDocuments(find)
    const objectPagination=paginationHelper(req.query,countProducts,{
        currentPage:1,
        limitItems:12
    })
    // end Pagination 
    
    const products=await Product.find(find).sort({position:'desc'}).limit(objectPagination.limitItems).skip(objectPagination.skip)
    const newProducts=productsHelper.priceNewproduct(products);
    
    const productsCategory=await ProductCategory.find({
        deleted:false,
        status:"active",
        
    })
    res.render('client/pages/products/index',{
        title:"Danh sách sản phẩm",
        products:newProducts,
        productsCategory:productsCategory,
        pagination:objectPagination,
        search:search
    })
}
module.exports.featured=async(req,res)=>{
    let find={
        deleted:false,
        status:'active',
        featured:'1'
    }
    //  Pagination 
    const countProducts=await Product.countDocuments(find)
    const objectPagination=paginationHelper(req.query,countProducts,{
        currentPage:1,
        limitItems:12
    })
    // end Pagination 

    const products=await Product.find(find).sort({position:'desc'}).limit(objectPagination.limitItems).skip(objectPagination.skip)
    const newProducts=productsHelper.priceNewproduct(products);
    
    const productsCategory=await ProductCategory.find({
        deleted:false,
        status:"active",
        
    })
    res.render('client/pages/products/index',{
        title:"Danh sách sản phẩm nổi bật",
        products:newProducts,
        productsCategory:productsCategory,
        pagination:objectPagination
    })
}
module.exports.category=async(req,res)=>{
    try {
        const category=await ProductCategory.findOne({slug:req.params.slugCategory,status:"active",deleted:false})
        const productsCategory=await ProductCategory.find({
            deleted:false,
            status:"active",
            
        })
        const countProducts=await Product.countDocuments({
            product_category_id:category.id,
            deleted:false,
            status:"active"})
        const objectPagination=paginationHelper(req.query,countProducts,{
            currentPage:1,
            limitItems:12
        })
        const products=await Product.find({
            product_category_id:category.id,
            deleted:false,
            status:"active",
        }).limit(objectPagination.limitItems).skip(objectPagination.skip)
        const newProducts=productsHelper.priceNewproduct(products);
        res.render('client/pages/products/index',{
            title:"Danh sách sản phẩm",
            products:newProducts,
            productsCategory:productsCategory,
            pagination:objectPagination
        })
    } catch (error) {
        
    }
    
}

module.exports.comment=async(req,res)=>{
    const product_id=req.body.productId;
    const content=req.body.content;
    const tokenUser=req.cookies.tokenUser;
    const user=await User.findOne({
        tokenUser:tokenUser
    })
    // const user_id=
    const objectComment={
        product_id:product_id,
        content:content,
        user_id:user.id,
    }
    const comment=new Comment(objectComment)
    await comment.save()
    if(comment){
        res.json({
            success:'success',
            userName:user.fullname,
        })
    }
}