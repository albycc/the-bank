import {fetchPost} from '../utils/fetch-utils.js'

document.getElementById('logout-btn').addEventListener('click', async ()=>{
    console.log('logout');

    const res = await fetchPost('/api/logout');

    if(!res.loggedIn){
        document.location.href = '/'
    }

})