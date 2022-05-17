import {fetchPost} from '../utils/fetch-utils.js'

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const formData = new FormData(loginForm);

    const data = {}
    formData.forEach((value, key) => data[key] = value)

    const resData = await fetchPost('api/login', data)

    if(resData.hasOwnProperty('error')){
        alert(resData.error)
        return;
    }
    else{
        document.location.href = '/account'
    }

    console.log(resData)

})