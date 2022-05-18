import {fetchPost, fetchGet} from '../utils/fetch-utils.js'

document.getElementById('logout-btn').addEventListener('click', async ()=>{

    const res = await fetchPost('/api/logout');

    if(!res.loggedIn){
        document.location.href = '/'
    }

})

async function loadUser(){

    const data = await fetchGet('/api/loggedin');

    if(data.error){
        const main = document.getElementsByTagName('main')[0];
        const header = document.getElementById('header-navbar');
        main.innerHTML = `
            <div>
                <h1>Unauthorized</h1>
                <p><a href="/">Login</a> to see content</p>
            </div>
        `
        header.innerHTML = "";
        main.innerHTML
    }
    else{
        document.getElementById('username').innerText = data.user.name
    }
}

loadUser()