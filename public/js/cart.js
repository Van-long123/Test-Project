const cancel = document.querySelector('.cancel');
const confirm = document.querySelector('.confirm');
if(cancel){
    cancel.addEventListener('click',function(){
        closeConfirmation();
    });
}
if(confirm){
    confirm.addEventListener('click',function(){
        confirmDelete();
        closeConfirmation();
    });
}

function closeConfirmation() {
    document.getElementById("confirmationModal").style.display = "none";
}

const payCart=document.querySelector('.pay-cart')
if(payCart){
    payCart.addEventListener('click',e=>{
        window.location.href='http://localhost:3000/order/info'
    })
}

const btnPay = document.querySelectorAll('.btn-pay');
if (btnPay) {
    btnPay.forEach(btn=>{
        const productId=btn.getAttribute('data-id')
        btn.addEventListener('click', (e) => {
            $.ajax({
                type:'POST',
                url:'http://localhost:3000/order/checkPay',
                data:{
                    productId:productId
                },
                dataType:'json',
                success:function(response){
                    if(response.error){
                        document.getElementById("notificationmethod").style.display = "block";
                    }
                    else{

                        window.location.href=`/order/info?id=${productId}`
                    }
                },
                error :function(error){
                
                }
            })
        });
    })
}