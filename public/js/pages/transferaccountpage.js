import {fetchPost, fetchGet} from '../utils/fetch-utils.js'

const form = document.getElementById('form-transferaccounts');
const dropdownFrom = document.getElementById('dropdown-from');
const dropdownTo = document.getElementById('dropdown-to')

let accounts;

form.addEventListener('submit', async (e) =>{
    e.preventDefault();

    const formData = new FormData(form);

    const fetchData = {}
    formData.forEach((value, key) => fetchData[key] = value)

    if(fetchData.from === fetchData.to){
        alert('Cannot transfer to same accounts.');
        return;
    }

    console.log(fetchData);

    const fromAccount = accounts.find(account => account.number == fetchData.from)

    if(fetchData.amount > fromAccount.balance ){
        alert('Amount money is more than From account. Transaction canceled.')
    }

    console.log(fromAccount)

    const data = await fetchPost('/api/transfer', fetchData)

    if(data.success){
        alert('Tranfer succesful')
        document.location.reload()
    }

})

async function getAccounts(){
    const data = await fetchGet('/api/accounts');

    accounts = data;

    data.map(account => {
        dropdownFrom.innerHTML += `<option value="${account.number}">${account.name} ${account.balance}kr</option>`;
        dropdownTo.innerHTML += `<option value="${account.number}">${account.name} ${account.balance}kr</option>`;
    })
}

getAccounts()

