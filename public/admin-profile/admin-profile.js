import { addUserDataToDom } from "../dom";

window.onload = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user, token);
    
    if (token) {
        addUserDataToDom(user);
    }
};