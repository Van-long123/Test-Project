module.exports.generateRandomString=(length)=>{
    const characters='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result="";
    for(let i=0; i<length; i++){
        result+=characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
module.exports.generateRandomStringCode=(length)=>{
    const characters='0123456789'
    let result="";
    for(let i=0; i<length; i++){
        result+=characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const ORD='ORD'+result
    return ORD;
}
module.exports.generateRandomStringCodeOne=(length)=>{
    const characters='0123456789'
    let result="";
    for(let i=0; i<length; i++){
        result+=characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const ORD='ORDO'+result
    return ORD;
}
module.exports.generateRandomNumber=(length)=>{
    const characters='0123456789'
    let result="";
    for(let i=0; i<length; i++){
        result+=characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
module.exports.forgotPasswordPost=(req,res)=>{
    
}