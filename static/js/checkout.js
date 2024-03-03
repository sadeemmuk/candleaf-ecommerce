import { main_url, tokenPattren } from "./main.js";
import { decodeJwt, createElement } from "./main.js";

let jwt,
    state,
    button = document.querySelector('.button')

try{
    jwt = document.cookie.match(tokenPattren)[1]
}
catch(err){
    window.location.href = main_url
}

let getOrders = async function apiOrders(){
    const response = await fetch(`${main_url}/api/customers/`, {method : 'GET', headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${jwt}`
    }})
    if (response.status == 401) window.location.href = `${main_url}/accounts/login` 
    return await response.json();
}

let postInfo = async function apiInfo(){
    let user_id = decodeJwt(jwt).user_id
    const response = await fetch(`${main_url}/api/info/`, {method : 'POST', headers : {
        Accept: "application/json, text/plain, */*",
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${jwt}`
    }, body : JSON.stringify(
        {
            "owner" : user_id,
            "first_name" : document.querySelector('.first').value,
            "last_name" : document.querySelector('.last').value,
            "phone" : document.querySelector('.phone').value,
            "address" : document.querySelector('.address').value,
            "postal_code" : document.querySelector('.postal').value,
            "state" : state
        }
    )})

    if(response.status == 201) window.location.href = `${main_url}/shipping`
    else if (response.status == 400) alert("Check your info") 
}

getOrders().then((data) => createElement(data))

button.addEventListener('click', () => postInfo())

document.querySelector('.state').addEventListener("change", (e) => state = e.target.value)

export {createElement}