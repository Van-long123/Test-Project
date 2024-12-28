// pagination 

const buttonPagination=document.querySelectorAll('[button-pagination]')
if(buttonPagination.length>0){
    let url=new URL(window.location.href)
    buttonPagination.forEach(btn=>{
        btn.addEventListener('click',e=>{
            const page=btn.getAttribute('button-pagination')
            url.searchParams.set('page',page)
            window.location.href=url.href
        })
    })
}

//end pagination 
// Close alert
const countsp=document.querySelector('.countsp')
const showAlert=document.querySelector('[show-alert]');

const btnAdd=document.querySelectorAll('.btn-add')
btnAdd.forEach(btn=>{
    btn.addEventListener('click',e=>{
        const cart=btn.closest('.card')
        const productId=cart.getAttribute('data-id')
        
        $.ajax({
            type:'post',
            url:'/order/add',
            data:{
                productId:productId
            },
            dataType:'json',
            success:function(response){
                if(response.error){
                    // console.log(document.getElementById("notificationmethod"))
                    document.getElementById("notificationmethod").style.display = "block";
                }
                else{
                    if(response.countProduct){
                        const countProduct=countsp.textContent
                        // console.log(countProduct)
                        // console.log(countsp)
                        countsp.textContent=parseInt(countProduct)+1
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
})
const closeAlert=document.querySelector('[close-alert]')
if(closeAlert){
    closeAlert.addEventListener('click',e=>{
        showAlert.style.display = "none";
    })
}
// Close alert 
// show alert
const showAlert1=document.querySelector('[show-alert1]')
if(showAlert1){
    const time=parseInt(showAlert1.getAttribute('data-time'))
    setTimeout(() => {
        showAlert1.classList.add('d-none')
    }, time);
}
// show alert
// close show alert 
const closeAlert1=document.querySelector('[close-alert1]')
if(closeAlert1){
    closeAlert1.addEventListener('click',e=>{
        showAlert1.classList.add('d-none')
    })
}
// close show alert 
// delete item in cart 
const totalMoney = document.querySelector('.total-money .price-amount');
const trash=document.querySelector('.trash-all')
if(trash){
    trash.addEventListener('click',e=>{
        showConfirmation(0);
    })
}
const trashAll=document.querySelectorAll('.trash')
if(trashAll){
    trashAll.forEach(trash=>{
        trash.addEventListener('click',e=>{
            const productId=trash.closest('.cart-product').getAttribute('data-id')
            showConfirmation(productId);
        })
    })
}


let productIdToDelete = null;
function showConfirmation(productId){
    productIdToDelete = productId;
    document.getElementById("confirmationModal").style.display = "block";
}

let confirmDelete=()=>{
    $.ajax({
        type: 'post',
        url: '/order/delete',
        data: { 
            product_id: productIdToDelete,
        },
        dataType:'json',
        success:function(response){
            // let count=response.count
            console.log(response)
            if(response.deleteAll || response.countProduct==0){
                countsp.textContent=0
                document.getElementById('main_cart').innerHTML = `
                    <div class="container px-0" >
                        <div class=" cart-title py-2 mb-3">
                            <h4>GIỎ HÀNG</h4>
                        </div>
                        <div class="cart-empty py-4 rounded">
                            <img src="/uploads/cart1.png">
                            <p class="Cart-Empty-Notification">Giỏ hàng trống</p>
                            <p style="font-size: 16px;">Bạn tham khảo thêm các sản phẩm được Food gợi ý bên dưới nhé!</p>
                        </div>
                    </div>
                `;
                // document.querySelector('.countsp').textContent = count;
            }
            else{
                // document.querySelector('.countsp').textContent = count;
                
                const cartProduct=document.querySelector(`.cart-product[data-id="${productIdToDelete}"]`);
                let price_product=cartProduct.querySelector('.cart-tt .price-amount').textContent.slice(0,-1)
                let newPrice=parseFloat(totalMoney.textContent.slice(0,-1)) - parseFloat(price_product);
                totalMoney.innerHTML = newPrice.toFixed(3)+'<span class="currency-symbol">đ</span>';
                const countProduct=parseInt(countsp.textContent)
                countsp.textContent=countProduct-1
                
                // console.log(document.querySelector(`[data-id="66fca314f193a3a0841b558e"]`))
                cartProduct.style.display = "none"
            }
        },
        error: function(error){
            
        }
    })
}

// delete item in cart 

// increase
const increaseBtns=document.querySelectorAll('.increase-btn')
increaseBtns.forEach(btn=>{
    btn.addEventListener('click',e=>{
        const cartProduct=btn.closest('.cart-product')
        const productId=cartProduct.getAttribute('data-id')
        $.ajax({
            type:'post',
            url:'/order/add',
            data:{
                productId:productId
            },
            dataType:'json',
            success:function(response){
                if(response.error){
                    // console.log(document.getElementById("notificationmethod"))
                    document.getElementById("notificationmethod").style.display = "block";
                }
                else{
                    const quantityInput=cartProduct.querySelector('.quantity-input')
                    const quantity=parseInt(quantityInput.value)+1
                    
                    quantityInput.value=quantity;
                    const price_product=parseFloat(cartProduct.querySelector('.cart-gia .price-amount').textContent.slice(0,-1))
                    const newPrice=price_product*quantity
                    const priceAmount=cartProduct.querySelector('.cart-tt .price-amount')
                    priceAmount.innerHTML = newPrice.toFixed(3)+'<span class="currency-symbol">đ</span>';
    
                    const newTotalMoney = parseFloat(totalMoney.textContent.slice(0,-1)) + price_product;
                    totalMoney.innerHTML = newTotalMoney.toFixed(3)+'<span class="currency-symbol">đ</span>';
                }
                

            },
            error :function(error){
              
            }
        })
    })
})
// increase

// decrease
const decreaseBtns=document.querySelectorAll('.decrease-btn')
decreaseBtns.forEach(btn=>{
    btn.addEventListener('click',e=>{
        const cartProduct=btn.closest('.cart-product')
        const productId=cartProduct.getAttribute('data-id')
        const quantityInput=cartProduct.querySelector('.quantity-input').value
        console.log(productId)
        if(quantityInput>1){
            const quantityInput=cartProduct.querySelector('.quantity-input')
            const quantity=parseInt(quantityInput.value)-1
            $.ajax({
                type:'post',
                url:'/order/delete',
                data:{
                    product_id:productId,quantity:quantity
                },
                dataType:'json',
                success:function(response){
                    
                    quantityInput.value=quantity;
                    const price_product=parseFloat(cartProduct.querySelector('.cart-gia .price-amount').textContent.slice(0,-1))
                    const newPrice=price_product*quantity
                    const priceAmount=cartProduct.querySelector('.cart-tt .price-amount')
                    priceAmount.innerHTML = newPrice.toFixed(3)+'<span class="currency-symbol">đ</span>';
    
                    const newTotalMoney = parseFloat(totalMoney.textContent.slice(0,-1)) - price_product;
                    totalMoney.innerHTML = newTotalMoney.toFixed(3)+'<span class="currency-symbol">đ</span>';
    
                },
                error :function(error){
                  
                }
            })
        }
        
    })
})
// decrease

// notificationmethod
const confirmation=document.querySelector('.confirmation')
if(confirmation){
    confirmation.addEventListener('click',function(){
        document.getElementById("notificationmethod").style.display = "none";
    });
}


// notificationmethod

// search suggest 
const boxSearch=document.querySelector('.box-search')
if(boxSearch){
    console.log(boxSearch)
    const input=boxSearch.querySelector('input[name="search"]')
    const boxSuggest=boxSearch.querySelector('.inner-suggest')
    input.addEventListener('keyup',e=>{
        const keyword=input.value
        const link=`/search/suggest?keyword=${keyword}`
        fetch(link)
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                if(data.code==200){
                    const products=data.products
                    if(products.length>0){
                        boxSuggest.classList.add('show')
                        const htmls=products.map(product=>{
                            return `
                                <a class="inner-item" href="/detail/${product.slug}">
                                    <div class="inner-image"><img src=${product.thumbnail} /></div>
                                    <div class="inner-info">
                                        <div class="inner-title">${product.title}</div>
                                    </div>
                                </a>
                            `
                        })
                        
                        const boxList=boxSuggest.querySelector('.inner-list')
                        boxList.innerHTML=htmls.join('') 
                        // console.log(htmls.join(''))biến mảng thành chuỗi
                    }
                    else{
                        boxSuggest.classList.remove('show')
                    }
                    
                }
            })
    })
}
// search suggest 

// sidebar-filter
const priceOptionLink=document.querySelectorAll('.price-option-link')
if(priceOptionLink.length > 0){
    priceOptionLink.forEach(item=>{
        item.addEventListener('click',e=>{
            const redirect=item.getAttribute('nh-link-redirect')
            console.log(redirect)
        })
    })
}
// sidebar-filter