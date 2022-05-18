import {fetchPost, fetchGet} from '../utils/fetch-utils.js'


const accountContainer = (account) =>{
    const {name, number, balance} = account
    return `
        <div class="account-container">
            <span> ${name}</span>
            <span> ${number}</span>
            <span> ${balance} kr</span>
        </div>
    `
}

async function loadAccount(){
    const data = await fetchGet('/api/accounts')

    console.log(data)

    const accountsList = document.querySelector('.account-list-container');

    console.log(accountsList)

    accountsList.innerHTML += data.map(account => accountContainer(account)).join('');

    

}

loadAccount();