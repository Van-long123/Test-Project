const { convertToSlug } = require("./convertToSlug")

module.exports=(query)=>{
    let objectSearch={
        keyword:"",
    }
    if(query.keyword){
        objectSearch.keyword=query.keyword
        objectSearch.regex=new RegExp(query.keyword,'i')
        objectSearch.slugRegex=new RegExp(convertToSlug(query.keyword),'i')
    }
    return objectSearch
}