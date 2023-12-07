import {addUserDataToDom, removeUserDataFromDom} from "../dom.js";
import { logUserOut } from "../logout.js";

window.onload = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const joinUs = document.getElementById('membership-screen');
  console.log(user, token);

  if (token) {
    addUserDataToDom(user);
    logUserOut();
    joinUs.style.display = 'none';
    const userButton = document.getElementById('user-account');
    if (user.user_level_id === 1) {
      userButton.href = '/my-account/admin';
    } else if (user.user_level_id === 2) {
      userButton.href = '/my-account';
    }
  } else {
    removeUserDataFromDom();
    joinUs.style.display = 'block';
  }
};

const usualNames = [
  'Tasty Tornado',
  'Sizzling Symphony',
  'Funky Fusion',
  'Blissful Bites',
  'Gourmet Galaxy'
];

const glutenfreeNames = [
  'Gluten Guardian',
  'Wheatless Wonder',
  'Purely Parchment',
  'Grainless Gourmet'
];

const ketoNames = [ 
  'Carb Conqueror',
  'Ketogenic Knight',
  'Low-Carb Legend',
  'Keto Crunch',
  'High-Fat Hero'
];


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
    if (!result) {
      console.log('No pizzas in cart');
    }

  const generatePizzaName = (pizza) => {
    if (pizza.name && pizza.prompt_id !== null) {
      return pizza.name;
    } else {
      if (pizza.dough === 'usual') {
        return usualNames[Math.floor(Math.random() * usualNames.length)];
      } else if (pizza.dough === 'gluten-free') {
        return glutenfreeNames[Math.floor(Math.random() * glutenfreeNames.length)];
      } else if (pizza.dough === 'keto') {
        return ketoNames[Math.floor(Math.random() * ketoNames.length)];
      }
    }
  };

    const tableBody = document.querySelector('#selected-products tbody');

    console.log(result);
    if (result.error) {
      console.log('no pizzas in cart');
      const emptyCart = document.createElement('p');
      emptyCart.textContent = "You haven't added any pizzas to your cart yet. Explore our menu!";
      const menuButton = document.getElementById('mainpage-button');
      menuButton.textContent = 'To the mainpage';
      menuButton.addEventListener('click', function () {
        window.location.href = '/';
      });
      emptyCart.appendChild(menuButton);
      tableBody.appendChild(emptyCart);
      return;
    }

    result.rows.forEach(pizza => {
      const pizzaName = generatePizzaName(pizza);
      console.log(pizza);;
      const newRow = document.createElement('tr');
      const productCell = document.createElement('td');
      productCell.classList.add('product');
      const productDetails = document.createElement('div');
      productDetails.classList.add('product-details');
      productDetails.innerHTML = `
        <img class="pizza-img" src="../images/pizza-img.png" alt="Pizza Image">
        <div>
          <h4>${pizzaName}</h4>
          <p>${pizza.size.toUpperCase()}-sized pizza with ${pizza.dough} dough</p>
          <p>${result.result4.map(ingredient => ingredient.name).join(', ')}</p>
        </div>`;
      productCell.appendChild(productDetails);

      const quantityCell = document.createElement('td');
      quantityCell.classList.add('quantity');
      const quantitySelection = document.createElement('div');
      quantitySelection.classList.add('quantity-selection');
      quantitySelection.innerHTML = `
        <button id="minus">-</button>
        <p>${pizza.quantity}</p>
        <button id="plus">+</button>`;
      quantityCell.appendChild(quantitySelection);

      const totalCell = document.createElement('td');
      totalCell.classList.add('total');
      const totalPrice = parseFloat(pizza.price).toFixed(2) * parseInt(pizza.quantity); 
      totalCell.innerHTML = `<p>${totalPrice}€</p>`;

      const removeCell = document.createElement('td');
      removeCell.classList.add('remove');
      removeCell.innerHTML = `<i class="fa-solid fa-trash remove"></i>`;
      removeCell.addEventListener('click', async function () {
        try {
          const response = await fetch(`/shopping-cart/${pizza.pizza_id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          window.location.reload();
        } catch (error) {
          console.error('Error deleting pizza:', error.message);
        }
      });
      
      newRow.appendChild(productCell);
      newRow.appendChild(quantityCell);
      newRow.appendChild(totalCell);
      newRow.appendChild(removeCell);

      tableBody.appendChild(newRow);
    });

    const receiptTable = document.getElementById('receipt-table');
    const shippingFeeCell = receiptTable.querySelector('.shipping-fee.align-right');
    const paymentFeeCell = receiptTable.querySelector('.payment-fee.align-right');
    const totalCell = receiptTable.querySelector('.total.align-right');

    let totalPizzasPrice = 0;
    result.rows.forEach(pizza => {
      totalPizzasPrice += parseFloat(pizza.price) * parseInt(pizza.quantity);
    });
    const shippingFee = 0;
    const paymentFee = 0.5;

    const totalPrice = totalPizzasPrice + shippingFee + paymentFee;
    shippingFeeCell.textContent = `${shippingFee}€`;
    paymentFeeCell.textContent = `${paymentFee}€`;
    totalCell.textContent = `${totalPrice}€`;

    const minusButtons = document.querySelectorAll('#minus');
    const plusButtons = document.querySelectorAll('#plus');

    minusButtons.forEach(button => {
      button.addEventListener('click', async function () {
        try {
          const quantity = button.nextElementSibling.textContent;
          if (parseInt(quantity) === 1) {
            const response = await fetch(`/shopping-cart/${result.rows[0].pizza_id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            window.location.reload();
          }
          const newQuantity = parseInt(quantity) - 1;
          const response = await fetch(`/shopping-cart/${result.rows[0].pizza_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({quantity: newQuantity}),
          });
          window.location.reload();
        } catch {
          console.error('Error changing quantity:', error.message);
        }
      })
    });
    plusButtons.forEach(button => {
      button.addEventListener('click', async function () {
        try {
          const quantity = button.previousElementSibling.textContent;
          const newQuantity = parseInt(quantity) + 1;
          const response = await fetch(`/shopping-cart/${result.rows[0].pizza_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({quantity: newQuantity}),
          });
          window.location.reload();
        } catch {
          console.error('Error changing quantity:', error.message);
        }
      })
    });
    } catch (error) {
    console.error('Error fetching pizzas:', error.message);
  }
});



