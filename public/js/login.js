const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const formData = new FormData(loginForm);

    const data = {}
    for(let key of formData.keys()){
        data[key] = formData.get(key)
        console.log(`${key}: ${formData.get(key)}`)
    }

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const loginData = await res.json();

    console.log(loginData)
    


})