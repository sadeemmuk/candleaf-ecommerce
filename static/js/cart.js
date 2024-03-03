import { main_url } from "./main.js";
import { apiCall, tokenPattren} from "./main.js";

let jwt,
    page = window.location.href,
    button = document.querySelector('.button')

try {
  jwt = document.cookie.match(tokenPattren)[1];
} catch (err) {
  window.location.href = `${main_url}/accounts/login?next=${page}`;
}


let getOrder = apiCall(`${main_url}/api/customers/`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  },
});

async function productApi(items){
  const response = await fetch(`${main_url}/api/orders/`, {method : 'GET', headers : {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  }})
  if (response.status == 200){
    const data = await response.json();
    return {data, items}
  }
  else if(response.status == 401){
    window.location.href = `${main_url}/accounts/login?next=${page}`;
  }
}

async function removeOrder(id){
  const response = await fetch(`${main_url}/api/orders/${id}`, {method : 'DELETE', headers : {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  }})
  window.location.reload()
}

getOrder.then((data) => {
  if (data.results[0].order.length == 0) {
    document.querySelector('.no-elements').style.display = 'flex'
  } 
  return productApi(data.results[0])
})
.then((order) => {
  createProduct(order)
  document.querySelectorAll('.remove').forEach((element) => {
    element.addEventListener("click", (e) => {
      return removeOrder(e.target.id)
    })
  })
})

button.addEventListener("click", () => {
  apiCall(`${main_url}/api/info/`, {method : 'GET', headers : {
    'Authorization' : `Bearer ${jwt}`
  }})
  .then((data) => {
    if (data.results.length == 0){
      window.location.href = `${main_url}/checkout`
    }
    else if (data.results.length > 0){
      window.location.href = `${main_url}/shipping`
    }
  })
})

function createProduct(order){
  for (let i = 0; i < order.data.results.length; i++) {
    let container = document.querySelector('.section-three'),
        productContainer = document.querySelector('.container-product'),
        product = document.createElement('div'),
        img = document.createElement('img'),
        details = document.createElement('div'),
        h2 = document.createElement('h2'),
        a = document.createElement('a'),
        price = document.createElement('div'),
        quantity =  document.createElement('div'),
        number = document.createElement('span'),
        totalNumber = document.createElement('div'),
        finalPrice = document.createElement('span');

      product.classList.add('the-product')
      details.classList.add('details')
      img.src = `../../static/images/products/${order.items.order[i].name}.png`
      product.appendChild(img)
      h2.innerText = order.items.order[i].name
      a.classList.add('remove')
      a.id = order.data.results[i].id
      a.innerText = 'Remove'
      details.appendChild(h2)
      details.appendChild(a)
      product.appendChild(details)
      productContainer.appendChild(product)
      price.innerText = `$${order.items.order[i].price}`
      productContainer.appendChild(price)
      productContainer.classList.add('Quantity')
      number.innerText = order.data.results[i].number
      quantity.appendChild(number)
      productContainer.appendChild(quantity)
      finalPrice.innerText =  order.data.results[i].total_number
      totalNumber.innerText = '$'
      totalNumber.appendChild(finalPrice)
      productContainer.appendChild(totalNumber)
      container.appendChild(productContainer)
}
document.querySelector('.information span').innerText = order.items.total_price
}
