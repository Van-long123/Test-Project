module.exports=(query,countProducts,objectPagination)=>{
    const totalPage=Math.ceil(countProducts/objectPagination.limitItems)
    objectPagination.totalPage=totalPage
    if(query.page){
        objectPagination.currentPage=parseInt(query.page);
    }
    objectPagination.skip=( objectPagination.currentPage-1)*objectPagination.limitItems
    return objectPagination
}