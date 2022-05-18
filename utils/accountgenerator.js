function generateAccountNumber(){
    let format = '1234-';
    for(let i = 1; i < 10; i++){
        const number = Math.floor(Math.random()*9);
        format += number;
    }
    return format;
}

export {generateAccountNumber};