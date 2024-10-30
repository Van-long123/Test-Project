const unidecode=require('unidecode')
module.exports.convertToSlug=(text)=>{
    const unidecodeText=unidecode(text)
    const slug=unidecodeText.replace(/\s+/g,'-')
    return slug;
}