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

    
const doughButtons = document.querySelectorAll('.dough-image button');
const sizeButtons = document.querySelectorAll('.size button');

    doughButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.border = 'solid 3px green';
            this.style.fontWeight = 'bold';
            this.style.boxShadow = '1px 1px 1px #68563d';
        });
    });

sizeButtons.forEach(button => {
    button.addEventListener('click', function () {
        this.style.fontWeight = '750';
        this.style.boxShadow = '1px 1px 1px #68563d';
        this.style.border = 'solid 3px #ffe200'
    });
});


const categoryTitles = document.querySelectorAll('.category-title');

categoryTitles.forEach(function (title) {
    title.addEventListener('click', function () {
        const content = title.nextElementSibling;
        const arrow = title.querySelector('.arrow');

        if (content.style.display === 'block' || content.style.display === '') {
            content.style.display = 'none';
            content.style.maxHeight = '0';
            arrow.style.transform = 'rotate(0deg)';
        } else {
            const openCategories = document.querySelectorAll('.category-content');
            openCategories.forEach(function (openCategory) {
                openCategory.style.display = 'none';
                openCategory.style.maxHeight = '0';

                const arrowToReset = openCategory.previousElementSibling.querySelector('.arrow');
                arrowToReset.style.transform = 'rotate(0deg)';
            });

            content.style.display = 'block';
            content.style.maxHeight = content.scrollHeight + 'px';
            arrow.style.transform = 'rotate(180deg)';
        }
    });
});

const addToCartButton = document.getElementById('confirm-order');
    addToCartButton.addEventListener('click', sendToDatabase);
    function addToCart() {
        const selectedDough = document.querySelector('input[name="dough"]:checked').value;
        const selectedSize = document.querySelector('input[name="size"]:checked').value;
        const selectedIngredients = [];
        document.querySelectorAll('.category-content input:checked').forEach((checkbox) => {
          selectedIngredients.push(checkbox.id);
        });
        return {
          dough: selectedDough,
          size: selectedSize,
          ingredients: selectedIngredients,
          calories: 0,
          carbs: 0,
          fats: 0,
          protein: 0,
          price: 0
        };
      }


    async function sendToDatabase() {
        const pizzaData = addToCart();
        try {
            const response = await fetch('/make-your-pizza', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(pizzaData),
            });
            const result = await response.json();
            console.log(result);
          } catch (error) {
            console.error('Error sending data to the server:', error);
          }
    } 

