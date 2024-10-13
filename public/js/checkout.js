fetch('https://provinces.open-api.vn/api/?depth=3')
    .then(response=>{
        return response.json()
    })
    .then(data=>{
        let provinces=data
        for (const province of provinces) {
            document.getElementById('provinces').innerHTML+=`<option value="${province.code}">${province.name}</option>`
            // ko += là nó thằng sau sẽ ghi đè thằng trước còn có là nó ko ghi đề mà sẽ thêm vào
            // document.getElementById('provinces').innerHTML=`<option value="${province.name}">${province.name}</option>`
        }
    })
    .catch(error=>{
        console.error('Lỗi khi gọi API',error)
    })


const provinces=document.getElementById('provinces')
if(provinces){
    provinces.addEventListener('change',e=>{
        const codeProvince=e.target.value
        fetch('https://provinces.open-api.vn/api/?depth=3')
            .then(response=>{
                return response.json()
            })
            .then(data=>{
                let provinces=data
                const filteredData = provinces.filter(item => item.code == codeProvince);
                // console.log(filteredData[0].districts)
                document.getElementById('districts').innerHTML = '<option value="">-- Quận huyện --</option>';
                for (const district of filteredData[0].districts) {
                    document.getElementById('districts').innerHTML+=`<option value="${district.code}">${district.name}</option>`
                    // ko += là nó thằng sau sẽ ghi đè thằng trước còn có là nó ko ghi đề mà sẽ thêm vào
                    // document.getElementById('provinces').innerHTML=`<option value="${province.name}">${province.name}</option>`
                }
            })
            .catch(error=>{
                console.error('Lỗi khi gọi API',error)
            })
        ;
    })
}

const districts=document.getElementById('districts')
if(districts){
    districts.addEventListener('change',e=>{
        const codedistrict=e.target.value
        // này là nó lấy đc cái district ko lấy đc province
        // cần code của district sẽ lấy đc nó
        fetch(`https://provinces.open-api.vn/api/d/${codedistrict}?depth=2`)
            .then(response=>{
                return response.json()
            })
            .then(data=>{
                document.getElementById('wards').innerHTML = '<option value="">-- Phường xã --</option>';
                let wards=data.wards
                for (const ward of wards) {
                    document.getElementById('wards').innerHTML+=`<option value="${ward.code}">${ward.name}</option>`
                }
            })
            .catch(error=>{
                console.error('Lỗi khi gọi API',error)
            })
        ;
    })
}

const fullname=document.querySelector('input[name="full_name"]')
fullname.addEventListener('change',e=>{
    if(!fullname.value){
        document.querySelector('#full_name-error').style.display='block'
    }
    else{
        document.querySelector('#full_name-error').style.display='none'

    }
})
const phone=document.querySelector('input[name="phone"]')
phone.addEventListener('change',e=>{
    if(!phone.value){
        document.querySelector('#phone-error').style.display='block'
    }
    else{
        document.querySelector('#phone-error').style.display='none'

    }
    
})
const address=document.querySelector('input[name="address"]')
address.addEventListener('change',e=>{
    if(!address.value){
        document.querySelector('#address-error').style.display='block'
    }
    else{
        document.querySelector('#address-error').style.display='none'

    }
})
const province=document.querySelector('#provinces')
province.addEventListener('change',e=>{
    const provinceSelected=province.value
    if(!provinceSelected){
        document.querySelector('#provinces-error').style.display='block'
    }
    else{
        document.querySelector('#provinces-error').style.display='none'

    }
})

const district=document.querySelector('#districts')
district.addEventListener('change',e=>{
    const districtSelected=district.value
    if(!districtSelected){
        document.querySelector('#districts-error').style.display='block'
    }
    else{
        document.querySelector('#districts-error').style.display='none'
    }
})
const wards=document.querySelector('#wards')
wards.addEventListener('change',e=>{
    const wardSelected=wards.value
    if(!wardSelected){
        document.querySelector('#wards-error').style.display='block'
    }
    else{
        document.querySelector('#wards-error').style.display='none'
    }

})






const btn1a=document.querySelector('.btn-1a')
if(btn1a){
    btn1a.addEventListener('click',e=>{
        let checkInfo=true;
        const fullname=document.querySelector('input[name="full_name"]').value
        const phone=document.querySelector('input[name="phone"]').value
        const address=document.querySelector('input[name="address"]').value

        const provinces=document.querySelector('#provinces')
        const provinceSelected=provinces.value
        const provinceValue=provinces.querySelector(`option[value="${provinceSelected}"]`).textContent;
        
        const districts=document.querySelector('#districts')
        const districtSelected=districts.value
        const districtValue=districts.querySelector(`option[value="${districtSelected}"]`).textContent;
        
        const wards=document.querySelector('#wards')
        const wardSelected=wards.value
        const wardValue=wards.querySelector(`option[value="${wardSelected}"]`).textContent;
        
        const phoneRegex=/^[0-9]{10,11}$/;

        if(!fullname){
            checkInfo=false
            document.querySelector('#full_name-error').style.display='block'
        }
        // else{
        //     document.querySelector('#full_name-error').style.display='none'

        // }
        if(!phone){
            checkInfo=false
            document.querySelector('#phone-error').style.display='block'
        }
        if(!phoneRegex.test(phone)){
            checkInfo=false
            document.querySelector('#phone-error-format').style.display='block'
        }

        // else{
        //     document.querySelector('#phone-error').style.display='none'

        // }
        if(!address){
            checkInfo=false
            document.querySelector('#address-error').style.display='block'
        }
        // else{
        //     document.querySelector('#address-error').style.display='none'

        // }
        if(!provinceSelected){
            checkInfo=false
            document.querySelector('#provinces-error').style.display='block'
        }
        // else{
        //     document.querySelector('#provinces-error').style.display='none'

        // }
        if(!districtSelected){
            checkInfo=false
            document.querySelector('#districts-error').style.display='block'
        }
        // else{
        //     document.querySelector('#districts-error').style.display='none'
        // }
        if(!wardSelected){
            checkInfo=false
            document.querySelector('#wards-error').style.display='block'
        }
        // else{
        //     document.querySelector('#wards-error').style.display='none'
        // }


        const productsElement=document.querySelectorAll('.product-element-top')
        let ids=[]
        productsElement.forEach(item=>{
            const position=item.querySelector('.quantity strong').textContent;
            const id=item.getAttribute('data_id')
            ids.push(`${id}-${position}`) 
        })
        const productsId=ids.join(', ');

        let data={
            fullname:fullname,phone:phone,
            address:address,
            province:provinceValue,
            district:districtValue,
            ward:wardValue,
            products:productsId
        }   

        const url=new URL(window.location.href)
        if(url.searchParams.get('id')){
            data.payInHome=true
        }
        if(checkInfo){
            $.ajax({
                type:'post',
                url:'/order/create/checkout',
                data:data,
                dataType:'json',
                success:function(response){
                    if(response.code){
                        window.location.href='/order/checkout?code='+response.code
                    }
                },
                error:function(error){
    
                }
            })
        }
    })
}