import { apiCall} from "./main.js";
import { main_url } from "./main.js";



let button = document.querySelector(".button"),
  page = window.location.href;


async function orderApi(customer_id, token, product, number){
  const response = await fetch(`${main_url}/api/orders/`, {method : 'POST', headers : {
     Accept : 'application/json, text/plain, */*',
    'Content-Type' : 'application/json',
    'Authorization' : `Bearer ${token}`
  }, body : JSON.stringify({
    "customer" : customer_id,
    "product" : product,
    "number" : number
  })});
  if (response.status == 201) {
    button.value = 'Success to add'
    return await response.json()
  }
}

button.addEventListener("click", (e) => {
  button.innerText = 'Loading ...'
  e.preventDefault();
  let jwt,
    product_id = document.querySelector(".id").value,
    num = document.querySelector(".num").innerHTML;
  try {
    jwt = document.cookie.match(/jwtToken=([^;]+)/)[1];
  } catch (err) {
    window.location.href = `${main_url}/accounts/login?next=${page}`;
  }

  let getCustomer = apiCall(`${main_url}/api/customers/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  getCustomer
    .then((data) => {
      for (let i = 0; i < data.results[0].order.length; i++) {
        if (data.results[0].order[i].id == product_id) {
          button.setAttribute("disabled", "1");
          button.value = "Founded on the cart";
          button.style.backgroundColor = "#f2f2f2";
          button.style.color = "green";
          return false;
        }
      }
      return orderApi(
        data.results[0].id,
        jwt,
        parseInt(product_id),
        parseInt(num)
      );
    })
    .catch((err) => {
      window.location.href = `${main_url}/accounts/login?next=${page}`;
    })
});

let number = document.querySelector(".num");
document.querySelector(".increase").addEventListener("click", (e) => {
  e.preventDefault();
  number.innerHTML = parseInt(number.innerHTML) + 1;
});

document.querySelector(".decrease").addEventListener("click", (e) => {
  e.preventDefault();
  if (number.innerHTML !== "1")
    number.innerHTML = parseInt(number.innerHTML) - 1;
});
