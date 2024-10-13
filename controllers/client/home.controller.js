const ProductCategory=require("../../model/products-category.model");
const Product=require("../../model/product.model");
const productsHelper=require("../../helpers/product");

module.exports.index=async(req,res)=>{
    const productsFeature = await Product.find({
        deleted:false,
        featured:"1",
        status:"active"
    }).limit(8)
    // const productsFeature = await Product.aggregate([
    //     { $match: { deleted: false, featured: "1", status: 'active' } },  // Lọc các bản ghi phù hợp
    //     { $sample: { size: 8 } }  // Lấy ngẫu nhiên 6 bản ghi
    // ]);
    const newProducts=productsHelper.priceNewproduct(productsFeature)

    const products=await Product.find({
        deleted:false,
        status:"active"
    }).limit(6).sort({position:'desc'})
    const productsNew=productsHelper.priceNewproduct(products)

    const productsCategory=await ProductCategory.find({
        deleted:false,
        status:"active"
    })
    // console.log(productsCategory)
    res.render('client/pages/home/index',{
        title:'Danh sách sản phẩm',
        productsFeatured:newProducts,
        productNew:productsNew,
        productsCategory:productsCategory
    })
}