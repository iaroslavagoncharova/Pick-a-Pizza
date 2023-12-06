const fetch = require('node-fetch'); 
const { addUserDataToDom, removeUserDataFromDom } = require('../dom.js'); 
const { logUserOut } = require('../logout.js'); 
const shoppingCartData = require('../shopping-cart/shopping-cart.js'); 

window.onload = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user, token);

  if (token) {
    addUserDataToDom(user);
    logUserOut();
    const userButton = document.getElementById('user-account');
    if (user.user_level_id === 1) {
      userButton.href = '/my-account/admin';
    } else if (user.user_level_id === 2) {
      userButton.href = '/my-account';
    }
  } else {
    removeUserDataFromDom();
  }
};

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`/pizzas/${user.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(user.user_id);
    const result = await response.json();

    const orderLines = result.rows.map(pizza => ({
      type: 'physical',
      reference: pizza.name || 'Unnamed Item',
      quantity: pizza.quantity,
      quantity_unit: 'pcs',
      unit_price: parseFloat(pizza.price),
      tax_rate: 0,
      total_amount: parseFloat(pizza.price) * pizza.quantity,
      total_discount_amount: 0,
      total_tax_amount: 0
    }));

    const orderAmount = orderLines.reduce((total, line) => total + line.total_amount, 0);

    const requestData = {
      purchase_country: 'FI',
      purchase_currency: 'EUR',
      locale: 'fi-EU',
      order_amount: orderAmount,
      order_tax_amount: 0,
      order_lines: orderLines,
      merchant_urls: {
        terms: 'https://www.example.com/terms.html',
        checkout: 'https://www.example.com/checkout.html',
        confirmation: 'https://www.example.com/confirmation.html',
        push: 'https://www.example.com/api/push'
      }
    };

    const apiUrl = 'https://api.playground.klarna.com/checkout/v3/orders'; 

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    };

    const apiResponse = await fetch(apiUrl, requestOptions);
    const responseData = await apiResponse.json();
    console.log('API Response:', responseData);

  } catch (error) {
    console.error('Error fetching pizzas:', error.message);
  }
});