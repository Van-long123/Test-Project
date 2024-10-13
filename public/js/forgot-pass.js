// forgot-password 
const buttonForgotPass=document.querySelector('[forgot-pass]');
if(buttonForgotPass){
    const formForgotPass=document.querySelector('#forgot-pass')
    buttonForgotPass.addEventListener('click',e=>{
        let checkInfo=true;
        e.preventDefault();
        const email=formForgotPass.querySelector('input[name="email"]').value
        if(!email){
            checkInfo=false
            document.querySelector('#email-error').style.display='block'
        }
        console.log(email)
        console.log(checkInfo)
        if(checkInfo){
            formForgotPass.submit()
        }

    })
}
// forgot-password 