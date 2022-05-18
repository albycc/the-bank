import {fetchPost} from '../utils/fetch-utils.js'

const form = document.getElementById('register-form');

form.addEventListener('submit', async (e) =>{
    e.preventDefault();

    const formData = new FormData(form);

    const fetchData = {}
    for(let key of formData.keys()){
        if(formData.get(key) === ''){
            alert('Missing field');
            return;
        }
        fetchData[key] = formData.get(key);
    }

    const data = await fetchPost('/api/accounts', fetchData)

    if(data.inserted){
        alert('Account created succesful')
    }

    form.reset();


})