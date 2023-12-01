import { addUserDataToDom, removeUserDataFromDom } from "../dom.js";
import { logUserOut } from "../logout.js";

window.onload = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user, token);
    
    if (token) {
        addUserDataToDom(user);
        logUserOut();
        const userButton = document.getElementById('user-account');
        // me ollaan tällä sivulla, joten account-näppäimen ei tarvii toimia
        userButton.href = '#';
    } else {
        removeUserDataFromDom();
    }
};