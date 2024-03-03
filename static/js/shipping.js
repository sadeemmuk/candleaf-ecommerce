import { main_url } from './main.js'
import { tokenPattren } from './main.js'
import { createElement } from './main.js'
import { apiCall } from './main.js'

let jwt,
    page = window.location,
    button = document.querySelector('.button')

try{
    jwt = document.cookie.match(tokenPattren)[1]
}
catch(err){
    window.location.href = `${main_url}/accounts/login`
}


async function getInfo(){
    const response = await fetch(`${main_url}/api/info/`, {method : 'GET', headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${jwt}`
    }})
    if (response.status == 401) window.location.href = `${main_url}/accounts/login`
    return await response.json()
}

async function getUser(info){
    const response = await fetch(`${main_url}/api/customers/`, {method : 'GET', headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${jwt}`
    }})
    let Customer = await response.json()
    return {info, Customer}
}

async function confirm(id){
    console.log(id);
    let response = await fetch(`${main_url}/api/customers/${id}/`, {method : 'PATCH', headers : {
        Accept : 'application/json, text/plagin, */*',
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${jwt}`
    }, body : JSON.stringify(
        {
            "status" : true
        }
    )})
    if (response.status == 401) window.location.href = `${main_url}/accounts/login`
    else if (response.status == 200) {
        window.location.href = `${main_url}/confirm`
    }
}

getInfo().then((info) => {
    if (info.results.length == 0){
        window.location.href = `${main_url}/checkout`
    }
    else return getUser(info)
})
.then((data) => {
    createElement(data.Customer)
    document.querySelector('.phone').innerText = data.info.results[0].phone
    document.querySelector('.address').innerText = 
    `${data.info.results[0].address}, ${data.info.results[0].postal_code}, ${data.info.results[0].state}`
    
    button.addEventListener('click', () => {
        button.innerText = 'Loading ...'
        confirm(data.Customer.results[0].id)
    })
})