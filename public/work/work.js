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

// if any set of ingredients already exists, remove it and open a blank make a pizza page

const craftPizza = document.getElementById('make-a-pizza');
craftPizza.addEventListener('click', () => {
  localStorage.removeItem('selectedPizzaIngredients');
  window.location.href = '/make-your-pizza';
});

document.addEventListener('DOMContentLoaded', async function() {
  // get prompt names to display in dropdowns
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

      async function selectPizza(promptId) {
        try {
          const response = await fetch(`/sets/${promptId}`, {
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
  // send comfirmation message when job application is submitted
    document.getElementById('job-application-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const confirmationMessage = document.getElementById('confirmation-message');
        confirmationMessage.textContent = 'Your job application has been submitted! We will contact you soon.';
    });
});
