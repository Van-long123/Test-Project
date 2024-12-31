// detail 
const btnComment=document.querySelector('#btnComment')
if(btnComment){
    btnComment.addEventListener("click",function(e){
        e.preventDefault();
        const flex=document.querySelector('.flex')
        const productId=flex.getAttribute('data-id')
        let content=document.getElementById('content').value;
        $.ajax({
                url:'/products/comment',
                type:'POST',
                data:{
                    productId:productId,
                    content:content,
                },
                dataType:'json',
                success:function(response){
                    console.log(response)
                    if (response.code == 200) {
                        $('#dsbinhluan').append('<div><span class="name-tag">' + response.userName +
                            ': </span>' +'<span class="prize">' + content + '</span></div>');
                        $('#content').val('');
                    }
                    else {
                        alert(response.message)
                    }
                },
                error:function(error){
                  
                }
            })
    })
}
//detail

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




const btnPay = document.querySelector('.button-buy-now');
if (btnPay) {
    const slug=btnPay.getAttribute('data-id')
    btnPay.addEventListener('click', (e) => {
        const quantity=parseInt(document.querySelector('.quantity-input').value)
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/order/checkPay',
            data:{
                slug:slug,quantity:quantity
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
                        document.getElementById("notificationmethod").style.display = "block";
                    }
                    
                }
                else{
                    let url = `/order/info/${slug}`;
                    if(quantity>1){
                        url=url+`?quantity=${quantity}`
                    }
                    window.location.href=url
                }
            },
            error :function(error){
            
            }
        })
    });
}

// rating 
const dataRating = document.querySelector('[data-rating]')
if (dataRating) {
    const stars = document.querySelectorAll('[data-star]')
    stars.forEach(star => {
        star.addEventListener('click', async (e) => {
            const rating = parseInt(star.getAttribute('data-star'))
            const id = document.querySelector('[data-id]').getAttribute('data-id')
            try {
                const response = await fetch('/products/rate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, rating }),
                })
                const result = await response.json()
                if (result.code == 200) {
                    document.querySelector('.rate-count').innerHTML = `(${result.averageRating.toFixed(1)})`
                    stars.forEach(star => {
                        if (parseInt(star.getAttribute('data-star')) <= rating) {
                            star.classList.add('active')
                        } else {
                            star.classList.remove('active')
                        }
                    })
                    const starsView = document.querySelectorAll('[star]')
                    starsView.forEach(star => {
                        if (parseInt(star.getAttribute('star')) <= result.averageRating) {
                            star.classList.add('active')
                            // 4.5 % 1 =0.5  4%1 =0 
                        } else if (result.averageRating % 1 !== 0 && parseInt(star.getAttribute('star')) == Math.round(result.averageRating)) {
                            star.classList.add('active')
                            // <i class="fa-solid fa-star-half-stroke"></i> nửa sao 
                            star.innerHTML = '<i class="fa-solid fa-star-half-stroke"></i>';
                        }
                        else {
                            star.classList.remove('active')
                            // i.fa-solid.fa-star  1 sao 
                            // i class="fa-regular fa-star"></i> sao rỗng
                            star.innerHTML = '<i class="fa-regular fa-star"></i>';
                        }
                    })

                }
                else {
                    alert(result.message)
                }

            } catch (error) {
                alert('Lỗi khi đánh giá, vui lòng thử lại.')
            }
        })
    })
}

const starsView = document.querySelectorAll('[star]')
if(starsView){
    const stars =document.querySelector('[averageRating]')
    if(stars){
        const averageRating=parseFloat(stars.getAttribute('averageRating'))
        starsView.forEach(star => {
            if (parseInt(star.getAttribute('star')) <= averageRating) {
                star.classList.add('active')
                // 4.5 % 1 =0.5  4%1 =0 
            } else if (averageRating % 1 !== 0 && parseInt(star.getAttribute('star')) == Math.round(averageRating)) {
                star.classList.add('active')
                // <i class="fa-solid fa-star-half-stroke"></i> nửa sao 
                star.innerHTML = '<i class="fa-solid fa-star-half-stroke"></i>';
            }
            else {
                star.classList.remove('active')
                // i.fa-solid.fa-star  1 sao 
                // i class="fa-regular fa-star"></i> sao rỗng
                star.innerHTML = '<i class="fa-regular fa-star"></i>';
            }
        })
    }
    
}
// rating 