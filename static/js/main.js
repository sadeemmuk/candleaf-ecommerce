const main_url = "http://localhost:8000";
const decodeJwt = (token) => JSON.parse(atob(token.split(".")[1]));
const tokenPattren = /jwtToken=([^;]+)/

async function apiCall(url, options) {
  const response = await fetch(url, options);
  if (response.status == 200) return await response.json();
  else if (response.status == 401) window.location.href = `${main_url}/accounts/login`
}

async function apiToken(user, pass) {
  const response = await fetch(`${main_url}/api/token/`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "username": user,
      "password": pass,
    }),
  });

  if (response.status == 401) alert('Wrong in Username or Password')
  else if (response.status == 200) return await response.json()
}

async function customerInfo(user_id, token){
  const response = await fetch(`${main_url}/api/customers/`, {method : 'POST', headers : {
     Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${token}`

  }, body : JSON.stringify({
      "owner" : user_id
  })});
  return await response.json()
}

function createElement(data){
  for (let i = 0; i < data.results[0].order.length; i++){
      let productCon = document.querySelector('.product-checkout'),
      product = document.createElement('div'),
      img = document.createElement('img'),
      details = document.createElement('div'),
      h2 = document.createElement('h2'),
      p = document.createElement('p')
  
  product.classList.add('the-product')
  img.src = `../../static/images/products/${data.results[0].order[i].name}.png`
  product.appendChild(img)
  details.classList.add('details')
  h2.innerText = `${data.results[0].order[i].name}`
  p.innerText = `$${data.results[0].order[i].price}`
  details.appendChild(h2)
  details.appendChild(p)
  product.appendChild(details)
  productCon.appendChild(product)
  }
  document.querySelector('.total .total-price span').innerText = data.results[0].total_price
}


export {decodeJwt, apiCall, apiToken, customerInfo, createElement};
export {main_url, tokenPattren};

