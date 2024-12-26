module.exports=(query)=>{
    let fillterStatus=[
        {
            name:"Tất cả",
            status:"",
            class:""
        },
        {
            name:"Đang chờ xử lý",
            status:"initit",
            class:""
        },
        {
            name:"Đã xác nhận",
            status:"confirm",
            class:""
        },
        {
            name:"Đang vận chuyển",
            status:"Shipped",
            class:""
        }
        ,
        {
            name:"Đã giao",
            status:"Delivered",
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