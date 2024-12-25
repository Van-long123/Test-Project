module.exports.priceNewproduct=(products)=>{
    const newProduct=products.map(item=>{
        // toFixed(0): Làm tròn số đến 0 chữ số thập phân kết quả trả vèe là 1 chuỗi
        item.priceNew=parseInt((item.price-(item.price*(item.discountPercentage/100))).toFixed(0))
        return item
    })
    return newProduct
}

module.exports.priceNew=(product)=>{
    const priceNew=parseInt((product.price-(product.price*(product.discountPercentage/100))).toFixed(0))
    return priceNew
}