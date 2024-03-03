import { decodeJwt, main_url } from "./main.js";
import { apiToken, customerInfo} from "./main.js";

let button = document.querySelector(".button")


async function signupApi(){
  let response = await fetch(`${main_url}/auth/users/`, {method : "POST", headers : {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  }, body : JSON.stringify(
    {
      "username": document.querySelector(".username").value,
      "email": document.querySelector(".email").value,
      "password": document.querySelector(".password").value
    }
  )})
  if (response.status == 400) alert("Some errors in your data")
  return await response.json()
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  let password = document.querySelector(".password").value,
    password2 = document.querySelector(".password2").value

    if (password !== password2) alert('Passwords donot matched')
    else {
      button.innerText = 'Loading ...'
      signupApi()
      .then((data) => {
       return apiToken(data.username, password)
     })
     .then((token) => {
       document.cookie = `jwtToken=${token.access}; path=/`;
       return customerInfo(decodeJwt(token.access).user_id, token.access);
     })
     .then((customer) =>{
       window.location.href = main_url
     })
     .finally((data) => button.innerText = 'Sign Up')
  }
});
