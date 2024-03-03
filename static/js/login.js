import { main_url } from "./main.js";
import { apiToken } from "./main.js";


let button = document.querySelector(".submit");

button.addEventListener("click", (e) => {
  let username = document.querySelector(".username").value,
    password = document.querySelector(".password").value;

  e.preventDefault();
  if (username == "" || password == "") {
    alert("These fields cannot be empty")
  } else {
    button.innerText = 'Loading ...'
    let login = apiToken(username, password)

    login.then((data) => {
      let token = data.access;
      document.cookie = `jwtToken=${token}; path=/`;
      try {
        let next = window.location.href.match(/next=([^;]+)/)[1];
        window.location.href = next;
      } catch (err) {
        window.location.href = main_url;
      }
    })
    .finally((data) => {
      button.innerText = 'Sign in'
    })
  }
});
