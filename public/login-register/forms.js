import {checkDevice} from "../menu-button.js";
import getPrompts from "../prompts.js";

window.onload = () => {
  getPrompts();
  checkDevice();
}

// Login and Register Forms
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");

// function that logs the user in
const logMeIn = async (email, password) => {
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  const data = await response.json();

  if (data.message === 'logged in') {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = '/';
  } else {
    alert('Invalid username/password');
  }
};

// Login form 
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  let loginEmail = document.getElementById('login-email').value;
  let loginPassword = document.getElementById('login-password').value;

  if (loginEmail === '' || loginPassword === '') {
    alert('Please fill out all fields');
    return;
  } else {
    logMeIn(loginEmail, loginPassword);
  };
});

// Registration form
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const registerUsername = document.getElementById('regist-username').value;
  const registerEmail = document.getElementById('regist-email').value;
  const registerAddress = document.getElementById('regist-address').value;
  const registerNumber = document.getElementById('regist-number').value;
  const registerPassword = document.getElementById('regist-password').value;
  const registerPasswordConfirm = document.getElementById('regist-password2').value;

  if (registerUsername === '' || registerEmail === '' || registerAddress === '' || registerNumber === '' || registerPassword === '' || registerPasswordConfirm === '') {
    alert('Please fill out all fields');
    return;
  } else if (registerPassword !== registerPasswordConfirm) {
    alert('Passwords do not match');
    return;
  } else if (document.getElementById('not-robot').checked == false) {
    alert('Are you a robot?');
    return;
  } else {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: registerUsername, email: registerEmail, address: registerAddress, phone_number: registerNumber, password: registerPassword }),
    });

    const data = await response.json();

    if (data.message === 'registration successful') {
      alert('Registration successful!');
      logMeIn(registerEmail, registerPassword);
    }
  }
});