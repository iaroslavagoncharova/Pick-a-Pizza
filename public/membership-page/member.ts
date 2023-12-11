import { addUserDataToDom, removeUserDataFromDom } from "../dom";
import { logUserOut } from "../logout";

interface User {
  username: string;
  email: string;
  address: string;
  favorite_pizza: string;
  phone_number: string;
  user_level_id: number;
  user_id: number;
  created_at: string;
}

window.onload = () => {
  const token: string | null = localStorage.getItem('token');
  const user: User | null = JSON.parse(localStorage.getItem('user') || 'null');
  const joinBtn: HTMLElement | null = document.getElementById('join-btn')!;
  console.log(user, token);

  if (token) {
    addUserDataToDom(user!);
    logUserOut();
    joinBtn.style.display = 'none';
    const userButton: HTMLAnchorElement | null = document.getElementById('user-account') as HTMLAnchorElement;
    if (user!.user_level_id === 1) {
      userButton.href = '/my-account/admin';
    } else if (user!.user_level_id === 2) {
      userButton.href = '/my-account';
    }
  } else {
    removeUserDataFromDom();
    joinBtn.style.display = 'flex';
  }
};

// if any set of ingredients already exists, remove it and open a blank make a pizza page
const craftPizza: HTMLElement | null = document.getElementById('make-a-pizza');
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
        const dropdown: HTMLElement | null = document.getElementById(`pizza-${i}`);
        if (dropdown) {
          dropdown.innerHTML = result[i - 1].prompt_name;

          dropdown.addEventListener('click', ((pizzaId: number) => {
            return () => {
              selectPizza(pizzaId);
            };
          })(i));
        }
      }

      let selectedPizzaIngredients: any[] = [];

      async function selectPizza(pizzaId: number) {
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
