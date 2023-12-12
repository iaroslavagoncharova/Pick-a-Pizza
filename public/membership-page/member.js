import onCommonReload from "../common.js";

window.onload = () => {
  onCommonReload();
  
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const joinBtn = document.getElementById('join-btn');

  if (token && user) {
    joinBtn.style.display = 'none';
  } else {
    joinBtn.style.display = 'flex';
  }
};

// if any set of ingredients already exists, remove it and open a blank make a pizza page
const craftPizza = document.getElementById('make-a-pizza');
craftPizza?.addEventListener('click', () => {
  localStorage.removeItem('selectedPizzaIngredients');
  window.location.href = '/make-your-pizza';
});

document.addEventListener('DOMContentLoaded', async () => {
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
        if (dropdown) {
          dropdown.innerHTML = result[i - 1].prompt_name;

          dropdown.addEventListener('click', ((pizzaId) => {
            return () => {
              selectPizza(pizzaId);
            };
          })(i));
        }
      }

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
