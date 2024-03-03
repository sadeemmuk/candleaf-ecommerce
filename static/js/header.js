import { tokenPattren } from './main.js'

let jwt,
    page = window.location.href

try{
    jwt = document.cookie.match(tokenPattren)[1]
    let a = document.createElement('a')
    a.classList.add('logout')
    a.style.cursor = 'pointer'
    a.innerText = 'Logout'
    document.querySelector('.second-icon').prepend(a)
    document.querySelector('.logout').addEventListener("click", () => {
        document.cookie = `jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        window.location.reload()
    })
}
catch(err){
    let a = document.createElement('a'),
    i = document.createElement('i')
    i.classList.add('fa-regular')
    i.classList.add('fa-user')
    a.href = `/accounts/login`
    a.appendChild(i)
    document.querySelector('.second-icon').prepend(a)
}