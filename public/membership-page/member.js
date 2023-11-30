import {addUserDataToDom} from "../dom.js";

window.onload = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user, token);

  if (token) {
    addUserDataToDom(user);
    const userButton = document.getElementById('user-account');
    if (user.user_level_id === 1) {
      userButton.href = '/my-account/admin';
    }
  }
};