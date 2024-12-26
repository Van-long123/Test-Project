const Product=require("../../model/product.model");
const OrderInfo=require("../../model/order-info.model");
const Cart=require("../../model/cart.model");
const Order=require("../../model/order.model");
const Generate=require("../../helpers/generate");
const productsHelper=require("../../helpers/product");
module.exports.index=async(req,res)=>{
    const productsRandom = await Product.aggregate([
        { $match: { deleted: false, status: 'active' } },  // Lọc các bản ghi phù hợp
        { $sample: { size: 7 } }  // Lấy ngẫu nhiên 6 bản ghi
    ]);
    const cartId=req.cookies.cartId;
    const cart=await Cart.findOne({_id: cartId})
    if(cart.products.length>0){
        for (const item of cart.products) {
            const productId=item.product_id;
            const productInfo = await Product.findOne({_id: productId}).select('title thumbnail price slug discountPercentage')
            productInfo.priceNew=productsHelper.priceNew(productInfo)
            productInfo.totalPrice=productInfo.priceNew*item.quantity
            item.productInfo=productInfo
        }
        cart.totalPrice=cart.products.reduce((sum,item)=>{
            return sum+item.productInfo.totalPrice
        },0)
    }
    console.log(cart.totalPrice)
    res.render("client/pages/cart/index",{
        title:"Giỏ hàng",productsRandom:productsRandom
        ,cartDetail:cart
    })

}
module.exports.checkPay=async (req,res)=>{
    const product_id=req.body.productId;
    const product= await Product.findOne({
        _id:product_id
    }).select('stock')
    if(product.stock==0){
        return res.json({
            error:'error',
        })
    }
    return res.json({
        success:'success',
    })
}
module.exports.add=async(req,res)=>{
    let response={
        success:'success',
    }
    const product_id=req.body.productId;
    const cartId=req.cookies.cartId
    const cart=await Cart.findOne({_id:cartId})
    const existsProductInCart=cart.products.find(item=>{
        return item.product_id==product_id
    })
    
    const product= await Product.findOne({
        _id:product_id
    }).select('stock')
    
    
    let quantity=1
    if(req.body.quantity){
        quantity=parseInt(req.body.quantity)
    }

    if(product.stock==0){
        res.json({
            error:'error',
        })
        return;
    }
    //10 11
    if(existsProductInCart){
        
        if(product.stock<existsProductInCart.quantity+1){
            res.json({
                error:'error',
            })
            return;
        }
        if(product.stock<existsProductInCart.quantity+quantity){
            res.json({
                error:'Số lượng bạn chọn quá hàng trong kho',
            })
            return;
        }
    }
    

    const objectCart={
        product_id:product_id,
        quantity:quantity
    }
    
    if(!existsProductInCart){
        response.countProduct='increase'
        await Cart.updateOne({_id:cartId},{$push:{products:objectCart}})
    }
    else{
        const quantityNew=existsProductInCart.quantity+quantity
        await Cart.updateOne({
            _id:cartId,
            'products.product_id':product_id
        },
        {
            $set:{
                'products.$.quantity':quantityNew
            }
        }
        )
    }
    // res.send('ok')
    res.json(response)
}
module.exports.delete=async(req,res)=>{
    let response={
        success:'success',
    }
    const product_id=req.body.product_id;
    const cartId=req.cookies.cartId;
    if(req.body.quantity){
        console.log(product_id)
        console.log(req.body.quantity)
        await Cart.updateOne({
            _id:cartId,
            'products.product_id':product_id
        },
        {
            $set:{
                'products.$.quantity':req.body.quantity
            }
        }
        )
    }
    else{
        if(product_id!=0){
            // console.log(product_id)
            await Cart.updateOne({_id:cartId},{$pull:{products:{product_id:product_id}}})
            const cart=await Cart.findOne({_id:cartId})
            const count=cart.products.length;
            response.countProduct=count
        }
        else{
            // console.log(product_id)
            await Cart.updateOne({_id:cartId},{products:[]})
            response.deleteAll='Delete All'
        }
    }
    
    
    res.json(response)
}

module.exports.checkout=async (req,res)=>{
    const orderInfo=await OrderInfo.findOne({code:req.query.code})
    // console.log(orderInfo)
    // res.send('ok')
    for (const item of orderInfo.products) {
        const productId=item.product_id;
        const productInfo = await Product.findOne({_id: productId}).select('title thumbnail price slug discountPercentage')
        productInfo.priceNew=productsHelper.priceNew(productInfo)
        productInfo.totalPrice=productInfo.priceNew*item.quantity
        item.productInfo=productInfo
    }
    orderInfo.totalPrice=orderInfo.products.reduce((sum,item)=>{
        return sum+item.productInfo.totalPrice
    },0)
    res.render('client/pages/checkout/index',{title:"Thanh toán đơn hàng",orderInfo:orderInfo})
}
module.exports.checkoutPost=async (req,res)=>{
    const orderInfo=await OrderInfo.findOne({code:req.query.code})
    
    const user_info={
        fullName:orderInfo.userInfo.fullname,
        phone:orderInfo.userInfo.phone,
        address:orderInfo.userInfo.address+', '+orderInfo.userInfo.province+', '+orderInfo.userInfo.district+', '+orderInfo.userInfo.ward,
    }
    const cartId=req.cookies.cartId;
    const products=[]
    for (const product of orderInfo.products) {
        let productId=product.product_id;
        let quantity=product.quantity || 1;
        await Product.findOneAndUpdate({_id:productId},{$inc:{stock:- quantity}})
    
        const objectProduct={
            product_id:product.product_id,
            price:0,
            quantity:product.quantity,
            discountPercentage:0,
        }
        const productInfo=await Product.findOne({_id:product.product_id}).select("discountPercentage price")
        objectProduct.price=productInfo.price
        objectProduct.discountPercentage=productInfo.discountPercentage
        products.push(objectProduct)
    }
    const order_info={
        cartId:cartId,
        userInfo:user_info,
        products:products,
        status:'Initit'
    }
    // console.log(order_info)
    if(res.locals.user){
        order_info.user_id=res.locals.user.id
    }
    const order=new Order(order_info)
    await order.save()
    
    if(!req.query.code.includes('ORDO')){
        await Cart.updateOne({_id:cartId},{products:[]})
    }

    res.redirect('/user/order')
}
module.exports.creatCheckout=async (req,res)=>{
    const ids =req.body.products.split(', ')
    let products=[];
    for (const item of ids) {
        let [id,quantity]=item.split('-')
        const objectProduct={
            product_id:id,
            quantity:parseInt(quantity),
        }
        products.push(objectProduct)
    }
    const cartId=req.cookies.cartId
    const userInfo={
        fullname:req.body.fullname,
        phone:req.body.phone,
        address:req.body.address,
        province:req.body.province,
        district:req.body.district,
        ward:req.body.ward,
    }
    // console.log(req.body)
    let code;
    if(req.body.payInHome){
        code=Generate.generateRandomStringCodeOne(8)
    }
    else{
        code=Generate.generateRandomStringCode(9)
    }
    const orderInfo=new OrderInfo({cartId,code,userInfo,products})
    orderInfo.save()
    return res.json({
        success:'success',
        code:orderInfo.code
    })
}
module.exports.info=async (req,res)=>{
    if(!req.query.id){
        var cart=await Cart.findOne({_id:req.cookies.cartId})
        if(cart.products.length>0){
            for (const item of cart.products) {
                const productId=item.product_id;
                const productInfo = await Product.findOne({_id: productId}).select('title thumbnail price slug discountPercentage')
                productInfo.priceNew=productsHelper.priceNew(productInfo)
                productInfo.totalPrice=productInfo.priceNew*item.quantity
                item.productInfo=productInfo
            }
            cart.totalPrice=cart.products.reduce((sum,item)=>{
                return sum+item.productInfo.totalPrice
            },0)
        }
    }
    else{
        var product=await Product.findOne({_id:req.query.id}).select('title price discountPercentage thumbnail slug stock')
        if(product.stock==0){
            req.flash('stockError','Sản phẩm đã bán hết')
            res.redirect('back')
            return 
        }
        product.priceNew=productsHelper.priceNew(product)
    }

    res.render('client/pages/checkout/info',{
        title:"Thông tin đơn hàng",
        cartDetail:cart,
        product:product
    })
}