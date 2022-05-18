import {fetchGet, fetchPost} from '../utils/fetch-utils.js'

const accountsListContainer = document.querySelector('.account-list-container');

const accountContainer = (account) =>{
    const {name, number, balance} = account
    return `
        <div class="account-container"">
            <span> ${name}</span>
            <span> ${number}</span>
            <span> ${balance} kr</span>
            <input type="button" value="X" class="delete-btn" data-accountid="${account._id}">
        </div>
    `
}

async function getAccounts(){
    const accounts = await fetchGet('/api/accounts');


    accountsListContainer.innerHTML += accounts.map(account => accountContainer(account)).join('');

    Array.from(document.querySelectorAll('.delete-btn')).forEach(button => button.addEventListener('click', async (e)=>{

        const button = e.target;

        if(window.confirm("Delete account?")){
            const data = await fetchPost('/api/delete', {id:button.dataset.accountid});
    
            if(data.success){
    
                alert('Account deleted succeful.')
                const accountContainer = button.parentElement;
        
                accountContainer.parentElement.removeChild(accountContainer)
    
            }
        }

    }))
}

getAccounts();
