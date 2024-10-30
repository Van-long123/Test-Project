const Product=require("../../model/product.model");
const convertToSlugHelper=require("../../helpers/convertToSlug")
module.exports.suggest=async (req,res)=>{
    const keyword=req.query.keyword
    let newProducts=[];
    if(keyword){
        search=(keyword).trim();
        const stringSLug=convertToSlugHelper.convertToSlug(search)
        const SlugRegex=new RegExp(stringSLug,'i')
        const keywordRegex=new RegExp(search,'i')

        const products=await Product.find({
            $or:[
                {title:keywordRegex},
                {slug:SlugRegex}
            ],
            deleted:false
            
        })
        for (const product of products) {
            newProducts.push({
                id:product.id,
                title:product.title,
                thumbnail:product.thumbnail,
                slug:product.slug,
            })
        }
        
    }
    res.json({
        code:200,
        message:"Thành công",
        products:newProducts
    })

}