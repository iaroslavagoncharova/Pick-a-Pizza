import {addUserDataToDom, removeUserDataFromDom} from "../dom.js";
import { logUserOut } from "../logout.js";
import fetchOrders from "./order-data.js";

const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userNumber = document.getElementById('user-number');
const userAddress = document.getElementById('user-address');

const changeUsername = document.getElementById('change-username');
const changeEmail = document.getElementById('change-email');
const changeAddress = document.getElementById('change-address');
const changeNumber = document.getElementById('change-number');

window.onload = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(typeof user);
    console.log(user, token);
    
    if (token) {
        addUserDataToDom(user);
        logUserOut();
        fetchOrders(user.user_id);
        const userButton = document.getElementById('user-account');
        // me ollaan tällä sivulla, linkin ei tarvii viedä tänne
        userButton.href = '#';

        userName.innerHTML = user.username;
        userEmail.innerHTML = user.email;
        userNumber.innerHTML = user.phone_number;
        userAddress.innerHTML = user.address;


        changeUsername.placeholder = user.username;
        changeEmail.placeholder = user.email;
        changeNumber.placeholder = user.phone_number;
        changeAddress.placeholder = user.address;
    } else {
        removeUserDataFromDom();
    }
};

const changeProfile = document.getElementById('change-profile');
const dialog = document.getElementById('edit-profile-dialog');
const closeDialog = document.getElementById('close-dialog');

const deleteBtn = document.getElementById('delete-btn');
const deletePopup = document.getElementById('confirm-deletion');
const cancelBtn = document.getElementById('cancel');
const confirmBtn = document.getElementById('confirm');

const header = document.querySelector('header');
const pageContent = document.querySelector('.hero-image');
const footer = document.querySelector('footer');

changeProfile.addEventListener('click', () => {
    dialog.classList.remove('hidden');
    dialog.classList.add('open-dialog');
    header.classList.add('blur-background');
    pageContent.classList.add('blur-background');
    footer.classList.add('blur-background');
});


closeDialog.addEventListener('click', () => {
    dialog.classList.remove('open-dialog');
    dialog.classList.add('hidden');
    header.classList.remove('blur-background');
    pageContent.classList.remove('blur-background');
    footer.classList.remove('blur-background');
})

deleteBtn.addEventListener('click', () => {
    deletePopup.classList.remove('hidden');
    deletePopup.classList.add('open-popup');
    dialog.classList.add('blur-background');

})

cancelBtn.addEventListener('click', () => {
    deletePopup.classList.remove('open-popup');
    deletePopup.classList.add('hidden');
    dialog.classList.remove('blur-background');
})

confirmBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    
    const response = await fetch (`/users/delete/${user.user_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });


    if (response.status === 204) {
        alert('Account deletion successful. Logging out...')
        localStorage.clear();
        window.location.href = '/';
    } else {
        alert("couldn't delete account!");
    };
});

// if any set of ingredients already exists, remove it and open a blank make a pizza page
const craftPizza = document.getElementById('make-a-pizza');
craftPizza.addEventListener('click', () => {
  localStorage.removeItem('selectedPizzaIngredients');
  window.location.href = '/make-your-pizza';
});

document.addEventListener('DOMContentLoaded', async function() {
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