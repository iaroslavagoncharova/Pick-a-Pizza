import {addUserDataToDom, removeUserDataFromDom} from "../dom.js";
import { logUserOut } from "../logout.js";

window.onload = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const joinBtn = document.getElementById('join-btn');
  console.log(user, token);

  if (token) {
    addUserDataToDom(user);
    logUserOut();
    joinBtn.style.display = 'none';
    const userButton = document.getElementById('user-account');
    if (user.user_level_id === 1) {
      userButton.href = '/my-account/admin';
    } else if (user.user_level_id === 2) {
      userButton.href = '/my-account';
    }
  } else {
    removeUserDataFromDom();
    joinBtn.style.display = 'flex';
  }
};