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
    }
  } else {
    removeUserDataFromDom();
  }
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('job-application-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from actually submitting

    
        const confirmationMessage = document.getElementById('confirmation-message');
        confirmationMessage.textContent = 'Your job application has been submitted! We will contact you soon.';
    });
});
