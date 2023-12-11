import { addUserDataToDom, removeUserDataFromDom } from "../dom";
import { logUserOut } from "../logout";

interface User {
  address: string;
  created_at: string;
  email: string;
  favorite_pizza: string;
  phone_number: string;
  user_id: number;
  user_level_id: number;
  username: string;
}

window.onload = () => {
  try {
    const token: string | null = localStorage.getItem('token');
    const user: User | null = JSON.parse(localStorage.getItem('user') || '');
    console.log(user, token);

    if (token && user) {
      addUserDataToDom(user);
      logUserOut();
      const userButton: HTMLAnchorElement | null = document.getElementById('user-account') as HTMLAnchorElement | null;
    
      if (userButton) {
        if (user.user_level_id === 1) {
          userButton.href = '/my-account/admin';
        } else if (user.user_level_id === 2) {
          userButton.href = '/my-account';
        }
      }
    } else {
      removeUserDataFromDom();
    }
  } catch (error) {
    console.error('Error during initialization:', error);
  }
};

// If any set of ingredients already exists, remove it and open a blank make a pizza page
const craftPizza: HTMLElement | null = document.getElementById('make-a-pizza');

if (craftPizza) {
  craftPizza.addEventListener('click', () => {
    localStorage.removeItem('selectedPizzaIngredients');
    window.location.href = '/make-your-pizza';
  });
}

document.addEventListener('DOMContentLoaded', async function () {
  // Get prompt names to display in dropdowns
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

      // Create a link for each prompt dropdown
      for (let i = 1; i <= 6; i++) {
        const dropdown: HTMLElement | null = document.getElementById(`pizza-${i}`);

        if (dropdown) {
          dropdown.innerHTML = result[i - 1].prompt_name;

          dropdown.addEventListener('click', (function (pizzaId) {
            return function () {
              selectPizza(pizzaId);
            };
          })(i));
        }
      }

      // Fetching an ingredient set for a chosen prompt, saving it to local storage, and redirecting to make a pizza page
      let selectedPizzaIngredients: any[] = [];
      const selectPizza = async (promptId: number) => {
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
      };
    
      for (let i = 1; i <= 6; i++) {
        const dropdown: HTMLElement | null = document.getElementById(`pizza-${i}`);
    
        if (dropdown) {
          dropdown.innerHTML = result[i - 1].prompt_name;
    
          dropdown.addEventListener('click', (function (pizzaId) {
            return function () {
              selectPizza(pizzaId);
            };
          })(i));
        }
      }
    
    } else {
      console.error('Error getting data from the server:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error getting data from the server:', error.message);
  }

  // Send confirmation message when the job application is submitted
  const jobApplicationForm: HTMLFormElement | null = document.getElementById('job-application-form') as HTMLFormElement;

if (jobApplicationForm) {
  jobApplicationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const confirmationMessage: HTMLElement | null = document.getElementById('confirmation-message');

    if (confirmationMessage) {
      confirmationMessage.textContent = 'Your job application has been submitted! We will contact you soon.';
    }
  });
}
});
