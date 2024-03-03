import {apiCall} from './main.js'
import { main_url } from './main.js'
import { tokenPattren } from './main.js'

let jwt
try{
    jwt = document.cookie.match(tokenPattren)[1]
}
catch(err){
    window.location.href = main_url
}

async function checkApi(){
    let response = await fetch(`${main_url}/api/customers/`, {method: "GET", headers: {
        'Content-Type' : "application/json",
        "Authorization" : `Bearer ${jwt}`
    }})
    if (response.status == 401) window.location.href = main_url
    else if (response.status == 200) return await response.json()
}

checkApi()