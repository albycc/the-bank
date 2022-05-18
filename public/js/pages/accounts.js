import {fetchPost, fetchGet} from '../utils/fetch-utils.js'

document.getElementById('logout-btn').addEventListener('click', async ()=>{
    console.log('logout');

    const res = await fetchPost('/api/logout');

    if(!res.loggedIn){
        document.location.href = '/'
    }

})

async function loadUser(){

    const data = await fetchGet('/api/loggedin')

    document.getElementById('username').innerText = data.user.name


}

loadUser()