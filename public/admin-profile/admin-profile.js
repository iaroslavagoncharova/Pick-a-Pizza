import { addUserDataToDom, removeUserDataFromDom } from "../dom.js";
import { logUserOut } from "../logout.js";
import fetchOrders from "./order-data.js";

window.onload = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user, token);
    
    if (token) {
        addUserDataToDom(user);
        logUserOut();
        fetchOrders(user.user_id);
        const userButton = document.getElementById('user-account');
        // me ollaan tällä sivulla, joten account-näppäimen ei tarvii toimia
        userButton.href = '#';
    } else {
        removeUserDataFromDom();
    }
};


const ordersBtn = document.getElementById('all-orders');
const dialog = document.getElementById('edit-profile-dialog');
const closeDialog = document.getElementById('close-dialog');

const deleteBtn = document.getElementById('delete-btn');
const deletePopup = document.getElementById('confirm-deletion');
const cancelBtn = document.getElementById('cancel');
const confirmBtn = document.getElementById('confirm');

const header = document.querySelector('header');
const pageContent = document.querySelector('.hero-image');
const footer = document.querySelector('footer');

ordersBtn.addEventListener('click', () => {
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