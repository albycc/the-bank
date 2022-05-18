import {fetchPost} from '../utils/fetch-utils.js'

const registerCustomerForm = document.getElementById('register-customer-form');

registerCustomerForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const formData = new FormData(registerCustomerForm);

    const registerData = {}
    for(let key of formData.keys()){
        if(formData.get(key) === ''){
            alert('Missing field');
            return;
        }
        registerData[key] = formData.get(key);
    }

    console.log(registerData)
    const data = await fetchPost('/register-customer', registerData)

    if(data.hasOwnProperty('error')){
        alert(data.error)
    }
    if(data.success){
        document.location.href = '/account'
    }
    console.log(data)

})