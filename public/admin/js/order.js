//change-status
const buttonChangeStatus=document.querySelectorAll('[button-change-status]')
if(buttonChangeStatus){
    const formChangeStatus=document.querySelector('#form-change-status')
    const path=formChangeStatus.getAttribute('data-path')
    buttonChangeStatus.forEach(btn=>{
        btn.addEventListener('change',e=>{
            const statusChange=e.target.value
            const id=btn.getAttribute('data-id')
            const action=path+`/${statusChange}/${id}?_method=PATCH`
            formChangeStatus.action=action
            formChangeStatus.submit()
        })
    })
    
    // buttonChangeStatus.forEach(btn=>{
    //     btn.addEventListener('click',e=>{
    //         const statusCurrent=btn.getAttribute('data-status')
    //         const id=btn.getAttribute('data-id')
    //         const statusChange=statusCurrent=="initit"?'confirm':'initit'
    //         const action=path+`/${statusChange}/${id}?_method=PATCH`
    //         formChangeStatus.action=action
    //         formChangeStatus.submit()
    //     })
    // })
}
//change-status
//delete-item
const buttonDelete=document.querySelectorAll('[button-delete]')
if(buttonDelete.length>0){
    const formDeleteItem=document.querySelector('#form-delete-item')
    const path=formDeleteItem.getAttribute('data-path')
    buttonDelete.forEach(btn=>{
        btn.addEventListener('click',e=>{
            const isConfirm=confirm('Bạn có chắc muốn xóa sản phẩm này')
            if(isConfirm){
                const id=btn.getAttribute('data-id')
                const action=path+`/${id}?_method=DELETE`
                formDeleteItem.action=action
                formDeleteItem.submit()
            }
            
        })
    })
}
//delete-item
