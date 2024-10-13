module.exports.priceNewproduct=(products)=>{
    const newProduct=products.map(item=>{
        item.priceNew=(item.price-(item.price*(item.discountPercentage/100))).toFixed(0)
        return item
    })
    return newProduct
}
module.exports.priceNew=(product)=>{
    const priceNew=(product.price-(product.price*(product.discountPercentage/100))).toFixed(0)
    return priceNew
}