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

// get stored pizza details from local storage
let selectedPizzaIngredients = [];
let storedPromptId = 0;

document.addEventListener('DOMContentLoaded', function () {
  const getPromptNames = async () => {
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
};

getPromptNames();

  if (localStorage.getItem('selectedPizzaIngredients') === null) {
    console.error('No selected pizza ingredients found in local storage');
  }

  selectedPizzaIngredients = JSON.parse(localStorage.getItem('selectedPizzaIngredients'));

  const storedDough = selectedPizzaIngredients.rows[0].dough;
  console.log(storedDough);
  const dough = document.getElementById(storedDough);
  dough.checked = true;

  const storedSize = selectedPizzaIngredients.rows[0].size.toLowerCase();
  console.log(storedSize);
  const size = document.getElementById(storedSize);
  size.checked = true;

  const storedName = selectedPizzaIngredients.rows[0].prompt_name;
  console.log(storedName);
  const name = document.getElementById('name');
  name.innerText = storedName;

  storedPromptId = selectedPizzaIngredients.rows[0].prompt_id;
  console.log('prompt id', storedPromptId);

  const storedIngredients = selectedPizzaIngredients.rows3;
  console.log(storedIngredients);

  // check the checkboxes for the ingredients that were selected
  storedIngredients.forEach(ingredient => {
    const ingredientName= ingredient.name;
    console.log(ingredientName);
    const ingredientCheckbox = document.getElementById(ingredientName);
    console.log(ingredientCheckbox);
    ingredientCheckbox.checked = true;
  });

  // update the calories, carbs, protein, fats and price based on the selected ingredients, dough and size
  updatePizzaInfo();
});

let totalCalories = 0;
let totalCarbs = 0;
let totalProtein = 0;
let totalFats = 0;
let totalPrice = 0;

const caloriesDisplay = document.getElementById('totalCalories');
const carbsDisplay = document.getElementById('totalCarbs');
const proteinDisplay = document.getElementById('totalProteins');
const fatsDisplay = document.getElementById('totalFats');
const priceDisplay = document.getElementById('totalPrice');

const dough = document.querySelectorAll('input[name="dough"]');
const size = document.querySelectorAll('input[name="size"]');
const quantityInput = document.getElementById('quantity');

const updatePizzaInfo = async () => {
  try {
    const clickedDough = document.querySelector('input[name="dough"]:checked');
    const clickedSize = document.querySelector('input[name="size"]:checked');
    const quantity = +quantityInput.value;

    if (!clickedDough || !clickedSize || isNaN(quantity)) {
      return;
    }

    const doughResponse = await fetch(`/sets/dough/${clickedDough.value}/${clickedSize.value.toUpperCase()}`);
    const doughResult = await doughResponse.json();

    caloriesDisplay.textContent = doughResult[0].dough_calories;
    carbsDisplay.textContent = doughResult[0].dough_carbs;
    proteinDisplay.textContent = doughResult[0].dough_protein;
    fatsDisplay.textContent = doughResult[0].dough_fats;

    const basePrice = doughResult[0].dough_price;

    totalPrice = basePrice * quantity;
    totalCalories = doughResult[0].dough_calories;
    totalCarbs = doughResult[0].dough_carbs;
    totalProtein = doughResult[0].dough_protein;
    totalFats = doughResult[0].dough_fats;


    // Fetch ingredient details
    const ingredients = document.querySelectorAll('.category-content input:checked');

    for (const ingredient of ingredients) {
      const response = await fetch(`/ingredients?id=${ingredient.id}`);
      const result = await response.json();

      const adjustedPrice = result[0].price * quantity;
      totalCalories += result[0].calories;
      totalCarbs += result[0].carbs;
      totalProtein += result[0].protein;
      totalFats += result[0].fats;
      totalPrice += adjustedPrice;
    }

    // Update display
    caloriesDisplay.textContent = totalCalories;
    carbsDisplay.textContent = totalCarbs;
    proteinDisplay.textContent = totalProtein;
    fatsDisplay.textContent = totalFats;
    priceDisplay.textContent = totalPrice.toFixed(2) + '€';
  } catch (error) {
    console.error('Error getting data from the server:', error);
  }
};

dough.forEach(dough => {
  dough.addEventListener('change', updatePizzaInfo);
});

size.forEach(size => {
  size.addEventListener('change', updatePizzaInfo);
});

quantityInput.addEventListener('input', updatePizzaInfo);

const ingredients = document.querySelectorAll('.category-content input');
ingredients.forEach(ingredient => {
  ingredient.addEventListener('change', async function () {
    console.log(ingredient.id);
    try {
      const response = await fetch(`/ingredients?id=${ingredient.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      const calories = result[0].calories;
      const carbs = result[0].carbs;
      const protein = result[0].protein;
      const fats = result[0].fats;
      const price = +result[0].price;

      const quantity = +quantityInput.value;
      const adjustedPrice = price * quantity;

      if (ingredient.checked) {
        totalCalories += calories;
        totalCarbs += carbs;
        totalProtein += protein;
        totalFats += fats;
        totalPrice += adjustedPrice;
      } else {
        totalCalories -= calories;
        totalCarbs -= carbs;
        totalProtein -= protein;
        totalFats -= fats;
        totalPrice -= adjustedPrice;
      }

      console.log('Total Calories:', totalCalories, 'Total Carbs:', totalCarbs, 'Total Protein:', totalProtein, 'Total Fats:', totalFats, 'Total Price:', totalPrice);

      // Update display
      caloriesDisplay.textContent = totalCalories;
      carbsDisplay.textContent = totalCarbs;
      proteinDisplay.textContent = totalProtein;
      fatsDisplay.textContent = totalFats;
      priceDisplay.textContent = totalPrice.toFixed(2) + '€';
    } catch (error) {
      console.error('Error getting data from the server:', error);
    }
  });
});

const doughButtons = document.querySelectorAll('.dough-image button');
const sizeButtons = document.querySelectorAll('.size button');

// add styling to dough and size buttons when clicked
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

// add opening and closing functionality to category titles

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

const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');

// add searching functionality to search bar

searchButton.addEventListener('click', function () {
    const searchValue = document.getElementById('search').value.toLowerCase();
    console.log(searchValue);
    const ingredients = document.querySelectorAll('.category-content input');
    const category = document.querySelectorAll('.category-content');
    ingredients.forEach(ingredient => {
      const label = ingredient.closest('li');
      const ingredientName = label.textContent.toLowerCase();
      if (searchValue !== '') {
        // if the ingredient name contains the search value, highlight it and open the category
            if (ingredientName.includes(searchValue)) {
              console.log('found', ingredient);
              label.style.border = '2px solid #e9451c';
              searchInput.addEventListener('input', function () {
                    label.style.border = '';
                    categoryTitles.forEach(title => {
                      const content = title.nextElementSibling;
                      const arrow = title.querySelector('.arrow');
              
                      content.style.display = 'none';
                      content.style.maxHeight = '0';
                      arrow.style.transform = 'rotate(0deg)';
                  });
            });
              category.forEach(category => {
                if (category.contains(ingredient)) {
                  category.style.display = 'block';
                  category.style.maxHeight = category.scrollHeight + 'px';
                  const arrow = category.previousElementSibling.querySelector('.arrow');
                  arrow.style.transform = 'rotate(180deg)';
                }
              });
          } else {
            label.style.border = '';
          }
        } else {
          label.style.border = '';
      }
      // remove the highlighting when a category is closed
      categoryTitles.forEach(categoryTitle => {
      categoryTitle.addEventListener('click', function () {
        label.style.border = '';
      }
    )
    });
    
  });
});

// add pizza details to cart
function addToCart() {
  const selectedDough = document.querySelector('input[name="dough"]:checked').value;
  const selectedSize = document.querySelector('input[name="size"]:checked').value;
  const message = document.getElementById('message').value;
  const quantity = document.getElementById('quantity').value;
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.user_id;
  const selectedIngredients = [];
  const originalPrice = totalPrice / quantity;
  document.querySelectorAll('.category-content input:checked').forEach((checkbox) => {
    selectedIngredients.push(checkbox.id);
  });
  if (storedPromptId) {
    return {
      user_id: userId,
      dough: selectedDough,
      size: selectedSize,
      message: message,
      ingredients: selectedIngredients,
      calories: totalCalories,
      carbs: totalCarbs,
      fats: totalFats,
      protein: totalProtein,
      price: originalPrice,
      quantity: quantity,
      prompt_id: storedPromptId
    }
  } 
    return {
    user_id: userId,
    dough: selectedDough,
    size: selectedSize,
    message: message,
    ingredients: selectedIngredients,
    calories: totalCalories,
    carbs: totalCarbs,
    fats: totalFats,
    protein: totalProtein,
    price: originalPrice, 
    quantity: quantity
  };
} 

const addToCartButton = document.getElementById('confirm-order');
    addToCartButton.addEventListener('click', async function () {
      const pizzaData = addToCart();
      // add pizza to the database
      try {
          const response = await fetch('/ingredients', {
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
      window.location.href = '/shopping-cart';
    });
