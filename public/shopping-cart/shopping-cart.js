import onCommonReload from "../common.js";
import { usualNames, glutenfreeNames, ketoNames } from "./pizza-names.js";

window.onload = () => {
  onCommonReload();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const joinUs = document.getElementById('membership-screen');
  const shippingFee = document.getElementById('shipping-fee');
  const mainpageButton = document.getElementById('mainpage-button');

  if (token && user) {
    joinUs.style.display = 'none';
    shippingFee.innerText = '0€';
  } else {
    joinUs.style.display = 'block';
    shippingFee.innerText = '1.50€';
    const emptyCart = document.createElement('p');
    emptyCart.textContent = "You haven't added any pizzas to your cart yet. Explore our menu!";
    const menuButton = document.getElementById('mainpage-button');
    menuButton.textContent = 'To the mainpage';
    menuButton.addEventListener('click', function () {
      window.location.href = '/';
    });
    emptyCart.appendChild(menuButton);
    const tableBody = document.querySelector('#selected-products tbody');
    tableBody.appendChild(emptyCart);
  }
};

document.addEventListener('DOMContentLoaded', async function () {
  // get all pizzas for a user
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
    // generate a pizza name if a prompt wasn't used
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
    // create a table with pizzas
    const tableBody = document.querySelector('#selected-products tbody');

    console.log(result);
    if (result.pizzaDetails.length === 0 || !result.pizzaDetails) {
      // if there's no pizzas in cart, display a message and invite to explore the menu
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
    if (result) {
      const menuButton = document.getElementById('mainpage-button');
      menuButton.style.display = 'none';
    }

    result.pizzaDetails.forEach(pizza => {
      // for each fetched pizza, generate a name, create a row and append it to the table
      const pizzaName = generatePizzaName(pizza);
      console.log(pizza);
      localStorage.setItem('pizzaData', JSON.stringify(pizza));
      const newRow = document.createElement('tr');
      const productCell = document.createElement('td');
      productCell.classList.add('product');
      const productDetails = document.createElement('div');
      productDetails.classList.add('product-details');
      productDetails.innerHTML = `
        <img class="pizza-img" src="../images/pizza-img.png" alt="Pizza Image">
        <div>
          <h3>${pizzaName}</h3>
          <p>${pizza.size.toUpperCase()}-sized pizza with ${pizza.dough} dough</p>
          <p>${pizza.result4.map(ingredient => ingredient.name).join(', ')}</p>
        </div>`;
      productCell.appendChild(productDetails);
  
      // generate a quantity selection and append it to the table
      const quantityCell = document.createElement('td');
      quantityCell.classList.add('quantity');
      const quantitySelection = document.createElement('div');
      quantitySelection.classList.add('quantity-selection');
      quantitySelection.innerHTML = `
        <button class="minus">-</button>
        <p>${pizza.quantity}</p>
        <button class="plus">+</button>`;
      quantityCell.appendChild(quantitySelection);
  
      // generate a total price and append it to the table
      const totalCell = document.createElement('td');
      totalCell.classList.add('total');
      
      // Use the price from the database
      const totalPrice = (parseFloat(pizza.price) * pizza.quantity).toFixed(2);
      totalCell.innerHTML = `<p>${totalPrice}€</p>`;

      // generate a remove button and append it to the table
      const removeCell = document.createElement('td');
      removeCell.classList.add('remove');
      removeCell.innerHTML = `<i class="fa-solid fa-trash remove"></i>`;
      removeCell.addEventListener('click', async function () {
        // if a remove button is clicked, delete the pizza from the database and reload the page
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

    // calculate total price
    let totalPizzasPrice = 0;
    result.pizzaDetails.forEach(pizza => {
      totalPizzasPrice += parseFloat(pizza.price) * pizza.quantity;
    });
    const shippingFee = 0;
    const paymentFee = 0.5;

    // display all prices
    const totalPrice = (totalPizzasPrice + shippingFee + paymentFee).toFixed(2);
    shippingFeeCell.textContent = `${shippingFee}€`;
    paymentFeeCell.textContent = `${paymentFee}€`;
    totalCell.textContent = `${totalPrice}€`;
    
    
    // open and close payment modal on click
    const openModalBtn = document.getElementById('checkout-btn');
    openModalBtn.addEventListener('click', () => {
      const modal = document.getElementById('paymentModal');
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
    const closeModalBtn = document.getElementById('closeModal');
    closeModalBtn.addEventListener('click', () => {
      const modal = document.getElementById('paymentModal');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    // simulate payment
    const payButton = document.getElementById("pay-button");
    const paymentStatusElement = document.getElementById("payment-status");
    const pizzaIds = result.pizzaDetails.map(pizza => pizza.pizza_id);

    payButton.addEventListener("click", async function () {
      try {
        const cardNumberInput = document.getElementById('card-number');
        const cvcInput = document.getElementById('cvc');
        const paymentResponse = await simulatePayment(cardNumberInput.value, cvcInput.value);
        
        if (paymentResponse.success) {
          const response = await fetch(`/shopping-cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({price: totalPizzasPrice, user_id: user.user_id, pizzaIds: pizzaIds}),
        });
        const resultCart = await response.json();
        console.log(resultCart);
        if (resultCart) {
          window.location.href = "/checkout";
        } else {
          console.error('Error creating cart:', response.status, response.statusText);
        }
        } else {
          paymentStatusElement.textContent = "Payment failed. Please try again.";
        }
      } catch (error) {
        console.error("Error processing payment:", error.message);
        paymentStatusElement.textContent = "Please check given info"
      }
    });
    const totalAmountElement = document.getElementById('total-amount');
    totalAmountElement.textContent = `${totalPrice}€`;
    
    async function simulatePayment(cardNumber, cvc) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate a successful payment if the card number is 16 digits and CVC is 3 digits
          const isValidCardNumber = /^\d{16}$/.test(cardNumber);
          const isValidCVC = /^\d{3}$/.test(cvc);
    
          if (isValidCardNumber && isValidCVC) {
            resolve({ success: true });
          } else {
            reject(new Error('Invalid card number or CVC'));
          }
        }, 1000); 
      });
    }
    

      // generate plus and minus buttons and add functionality to them
      const minusButtons = document.querySelectorAll('.minus');
      const plusButtons = document.querySelectorAll('.plus');
      
      minusButtons.forEach((button, index) => {
        button.addEventListener('click', async function () {
          try {
            const quantityElement = button.nextElementSibling;
            const currentQuantity = parseInt(quantityElement.textContent);
            
            // delete a pizza if quantity is 1 and minus button is clicked, so quantity becomes 0
            if (currentQuantity === 1) {
              const response = await fetch(`/shopping-cart/${result.pizzaDetails[index].pizza_id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            } else {
              // update quantity in database and reload the page
              const newQuantity = currentQuantity - 1;
              const response = await fetch(`/shopping-cart/${result.pizzaDetails[index].pizza_id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity }),
              });
            }
      
            window.location.reload();
          } catch (error) {
            console.error('Error changing quantity:', error.message);
          }
        });
      });
      
      // update quantity in database and reload the page
      plusButtons.forEach((button, index) => {
        button.addEventListener('click', async function () {
          try {
            const quantityElement = button.previousElementSibling;
            const currentQuantity = parseInt(quantityElement.textContent);
      
            const newQuantity = currentQuantity + 1;
            const response = await fetch(`/shopping-cart/${result.pizzaDetails[index].pizza_id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ quantity: newQuantity }),
            });
            
            window.location.reload();
          } catch (error) {
            console.error('Error changing quantity:', error.message);
          }
        });
      });
    } catch (error) {
    console.error('Error fetching pizzas:', error.message);
  }
});