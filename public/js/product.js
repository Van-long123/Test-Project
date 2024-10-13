const increase=document.querySelector('.increase')
if(increase){
    increase.addEventListener('click',e=>{

        const quantityInput=document.querySelector('.quantity-input')
        const quantity=parseInt(quantityInput.value)+1
        quantityInput.value=quantity;
    })
}

const decrease=document.querySelector('.decrease')
if(decrease){
    decrease.addEventListener('click',e=>{
        const quantityInput=document.querySelector('.quantity-input')
        const quantity=parseInt(quantityInput.value)
        if(quantity>1){
            quantityInput.value=quantity-1;
        }
    })
}

const buttonAddCart=document.querySelector('.button-add-cart')
if(buttonAddCart){
    buttonAddCart.addEventListener('click',e=>{
        const flex=document.querySelector('.flex')
        const productId=flex.getAttribute('data-id')
        const quantityInput=document.querySelector('.quantity-input')
        const quantity=parseInt(quantityInput.value)
        $.ajax({
            type:'post',
            // url:'http://localhost:3000/order/add',
            url:'/order/add',
            data:{
                productId:productId,quantity:quantity
            },
            dataType:'json',
            success:function(response){
                if(response.error){
                    if(response.error!='error'){
                        console.log(response.error)
                        document.querySelector(".method-text").textContent=response.error
                        document.getElementById("notificationmethod").style.display = "block";
                    }
                    else{
                        if(response.countProduct){
                            const countsp=document.querySelector('.countsp') 
                            const countProduct=parseInt(countsp.textContent)
                            countsp.textContent=countProduct+1
                        }
                        document.getElementById("notificationmethod").style.display = "block";
                    }
                    // console.log(document.getElementById("notificationmethod"))
                }
                else{
                    if(response.countProduct){
                        const countsp=document.querySelector('.countsp') 
                        const countProduct=parseInt(countsp.textContent)
                        countsp.textContent=countProduct+1
                    }
                    showAlert.style.display = "block";
                    if(showAlert){
                        const time=showAlert.getAttribute('data-time')
                        setTimeout(() => {
                            showAlert.style.display = "none";
                        }, time);
                    }
                }
            },
            error :function(error){
              
            }
        })
    })
    
}