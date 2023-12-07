import {addUserDataToDom, removeUserDataFromDom} from "../dom.js";
import { logUserOut } from "../logout.js";

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
    
    const response = await fetch (`/delete/${user.user_id}`, {
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
