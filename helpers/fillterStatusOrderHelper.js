module.exports=(query)=>{
    let fillterStatus=[
        {
            name:"Tất cả",
            status:"",
            class:""
        },
        {
            name:"Đang khởi tạo",
            status:"initit",
            class:""
        },
        {
            name:"Đã xác nhận",
            status:"confirm",
            class:""
        }
    ]
    
    if(query.status){
        const element=fillterStatus.find(item=>{
            return item.status==query.status
        })
        element.class='active'
    }
    else{
        const element=fillterStatus.find(item=>{
            return item.status==""
        })
        element.class='active'
    }
    return fillterStatus
}