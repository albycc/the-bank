
async function fetchPost(url, data, parameters = {}){

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        ...parameters
    }

    try{
        const res = await fetch(url, options)

        const resData = await res.json();

        return resData;
    }
    catch(error){
        console.log(error)
    }
};

async function fetchGet(url, parameters = {}){

    try{
        const res = await fetch(url, parameters);

        const resData = await res.json();

        return resData;
    }
    catch(error){
        console.log(error)
    }
}

export {fetchPost, fetchGet};