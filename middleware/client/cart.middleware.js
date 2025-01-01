const Cart=require('../../model/cart.model')
module.exports.cartId=async(req,res,next)=>{
    if(!req.cookies.cartId){
        const cart=new Cart()
        await cart.save()
        const expiresCookie=1000*60*60*24*365
        res.cookie('cartId',cart.id,{maxAge:expiresCookie, httponly:true})
    }
    else{
        // console.log(req.cookies.cartId)
        const cart=await Cart.findOne({_id:req.cookies.cartId})
        // console.log(cart)
        cart.totalQuantity=cart.products.reduce((sum,item)=>{
            return sum + parseInt(item.quantity);
        },0)
        res.locals.miniCart=cart
        res.locals.totalCart=cart.products.length
    }
    next();
}
