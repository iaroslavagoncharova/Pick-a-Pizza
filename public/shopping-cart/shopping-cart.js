import {addUserDataToDom, removeUserDataFromDom} from "../dom.js";
import { logUserOut } from "../logout.js";

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

const smallNames = [
  'Petite Pleasure',
  'Tiny Temptation',
  'Mini Muncher',
  'Diminutive Delight',
  'Pocket Pizza'
];

const mediumNames = [
  'Middling Marvel',
  'Moderate Munch',
  'Central Sizzler',
  'Balanced Bliss',
  'Middleweight Crave'
];

const bigNames = [
  'Grand Gobbler',
  'Jumbo Joy',
  'Mega Munchzilla',
  'King-Size Crave',
  'Whopper Whiz'
];

const veganNames = [
  'Plant-Based Paradise',
  'Vegan Victory',
  'Green Goodness',
  'Compassionate Crust',
  'Leafy Delight'
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
    console.log(result);
    let name = '';
    if (result.name) {
      name = result.name;
    } else {
    }

    const tableBody = document.querySelector('#selected-products tbody');

    result.rows.forEach(pizza => {
      const newRow = document.createElement('tr');
      const productCell = document.createElement('td');
      productCell.classList.add('product');
      const productDetails = document.createElement('div');
      productDetails.classList.add('product-details');
      productDetails.innerHTML = `
        <img class="pizza-img" src="../images/pizza-img.png" alt="Pizza Image">
        <div>
          <h4>${name}</h4>
          <p>${pizza.size}-sized pizza with ${pizza.dough} dough</p>
        </div>`;
      productCell.appendChild(productDetails);

      // Quantity column
      const quantityCell = document.createElement('td');
      quantityCell.classList.add('quantity');
      const quantitySelection = document.createElement('div');
      quantitySelection.classList.add('quantity-selection');
      quantitySelection.innerHTML = `
        <button>-</button>
        <p>${pizza.quantity}</p>
        <button>+</button>`;
      quantityCell.appendChild(quantitySelection);

      // Total column
      const totalCell = document.createElement('td');
      totalCell.classList.add('total');
      totalCell.innerHTML = `<p>${parseFloat(pizza.price) * parseInt(pizza.quantity)}€</p>`;

      // Append cells to the new row
      newRow.appendChild(productCell);
      newRow.appendChild(quantityCell);
      newRow.appendChild(totalCell);

      // Append the new row to the table body
      tableBody.appendChild(newRow);
    });
  } catch (error) {
    console.error('Error fetching pizzas:', error.message);
  }
});
