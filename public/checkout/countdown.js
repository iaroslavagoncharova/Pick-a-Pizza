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
    }
  } else {
    removeUserDataFromDom();
  }
};

// if any set of ingredients already exists, remove it and open a blank make a pizza page
const craftPizza = document.getElementById('make-a-pizza');
craftPizza.addEventListener('click', () => {
  localStorage.removeItem('selectedPizzaIngredients');
  window.location.href = '/make-your-pizza';
});

document.addEventListener('DOMContentLoaded', async function () {
   // get prompts to display in dropdowns
   try {
    const response = await fetch('/prompts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Response:', result);

      // create a link for each prompt dropdown

      for (let i = 1; i <= 6; i++) {
        const dropdown = document.getElementById(`pizza-${i}`);
        dropdown.innerHTML = result[i - 1].prompt_name;

        dropdown.addEventListener('click', (function (pizzaId) {
          return function () {
            selectPizza(pizzaId);
          };
        })(i));
      }

       // fetching an ingredient set for a chosen prompt, saving it to local storage and redirecting to make a pizza page
      let selectedPizzaIngredients = [];

      async function selectPizza(pizzaId) {
        try {
          const response = await fetch(`/sets/${pizzaId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const result = await response.json();
            console.log('Selected Pizza Ingredients:', result);
            selectedPizzaIngredients = result;

            if (localStorage.getItem('selectedPizzaIngredients')) {
              localStorage.removeItem('selectedPizzaIngredients');
            }

            localStorage.setItem('selectedPizzaIngredients', JSON.stringify(selectedPizzaIngredients));

            window.location.href = '/make-your-pizza';
          } else {
            console.error('Error getting data from the server:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error getting data from the server:', error.message);
        }
      }
    } else {
      console.error('Error getting data from the server:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error getting data from the server:', error.message);
  }
});

  function initializeCountdown() {
    const storedTimestamp = localStorage.getItem('countdownTimestamp');

    const initialTimestamp = storedTimestamp ? parseInt(storedTimestamp, 10) : Date.now();

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    
    const countdownDuration = getRandomInt(10, 20) * 60;
    const endTime = initialTimestamp + countdownDuration * 1000;

    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(updateCountdown, 1000);

    function updateCountdown() {
      const currentTime = Date.now();
      const remainingTime = Math.max(0, endTime - currentTime);
      const minutes = Math.floor(remainingTime / (60 * 1000));
      const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      countdownElement.textContent = `${minutes}:${seconds}`;

    
      if (remainingTime === 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = 'Your order is ready';
      }
    }
 
    localStorage.setItem('countdownTimestamp', initialTimestamp.toString());

    updateCountdown();
  }

  window.onload = initializeCountdown;
