import onCommonReload from "../common.js";
import fetchIngredients from "./ingredients.js";
import fetchOrders from "./order-data.js";
import fetchUsers from "./user-data.js";
import {checkDevice } from "../menu-button.js";

window.onload = () => {
    onCommonReload();
    checkDevice();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user, token);
    
    if (token && user) {
        fetchOrders(user.user_id);
        fetchUsers(user.user_id);
        fetchIngredients();
        const userButton = document.getElementById('user-account');
        // me ollaan tällä sivulla, joten account-näppäimen ei tarvii toimia
        userButton.href = '#';
    };
};

const header = document.querySelector('header');
const pageContent = document.querySelector('.hero-image');
const footer = document.querySelector('footer');

// orders dialog
const ordersBtn = document.getElementById('all-orders');
const ordersDialog = document.getElementById('edit-orders-dialog');
const closeOrdersDialog = document.getElementById('close-orders');

ordersBtn.addEventListener('click', () => {
  ordersDialog.classList.remove('hidden');
  ordersDialog.classList.add('open-dialog');
  header.classList.add('blur-background');
  pageContent.classList.add('blur-background');
  footer.classList.add('blur-background');
});

closeOrdersDialog.addEventListener('click', () => {
  ordersDialog.classList.remove('open-dialog');
  ordersDialog.classList.add('hidden');
  header.classList.remove('blur-background');
  pageContent.classList.remove('blur-background');
  footer.classList.remove('blur-background');
});

// users dialog
const usersBtn = document.getElementById('all-users');
const usersDialog = document.getElementById('edit-users-dialog');
const closeUsersDialog = document.getElementById('close-users');

usersBtn.addEventListener('click', () => {
  usersDialog.classList.remove('hidden');
  usersDialog.classList.add('open-dialog');
  header.classList.add('blur-background');
  pageContent.classList.add('blur-background');
  footer.classList.add('blur-background');
});

closeUsersDialog.addEventListener('click', () => {
  usersDialog.classList.remove('open-dialog');
  usersDialog.classList.add('hidden');
  header.classList.remove('blur-background');
  pageContent.classList.remove('blur-background');
  footer.classList.remove('blur-background');
});


// ingredients dialog
const igtsBtn = document.getElementById('all-ingredients');
const igtsDialog = document.getElementById('edit-ingredients-dialog');
const closeIgtsDialog = document.getElementById('close-ingredients');

igtsBtn.addEventListener('click', () => {
  igtsDialog.classList.remove('hidden');
  igtsDialog.classList.add('open-dialog');
  header.classList.add('blur-background');
  pageContent.classList.add('blur-background');
  footer.classList.add('blur-background');
});

closeIgtsDialog.addEventListener('click', () => {
  igtsDialog.classList.remove('open-dialog');
  igtsDialog.classList.add('hidden');
  header.classList.remove('blur-background');
  pageContent.classList.remove('blur-background');
  footer.classList.remove('blur-background');
});