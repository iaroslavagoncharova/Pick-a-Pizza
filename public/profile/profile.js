import {addUserDataToDom} from "../dom.js";

const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userNumber = document.getElementById('user-number');
const userAddress = document.getElementById('user-address');

window.onload = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(typeof user);
    console.log(user, token);
    
    if (token) {
        addUserDataToDom(user);
        
        userName.innerHTML = user.username;
        userEmail.innerHTML = user.email;
        userNumber.innerHTML = user.phone_number;
        userAddress.innerHTML = user.address;

    }
};