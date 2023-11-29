
// Login and Register Tabs
const loginTab = document.querySelector("#login-tab");
const registerTab = document.querySelector("#register-tab");
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");

registerTab.addEventListener("click", () => {
  if (
    registerTab.classList.contains("inactive-tab") &&
    registerForm.classList.contains("inactive-form")
  ) {
    registerTab.classList.replace("inactive-tab", "active-tab");
    loginTab.classList.replace("active-tab", "inactive-tab");
    registerForm.classList.replace("inactive-form", "active-form");
    loginForm.classList.replace("active-form", "inactive-form");
  }
});

loginTab.addEventListener("click", () => {
  if (
    loginTab.classList.contains("inactive-tab") &&
    loginForm.classList.contains("inactive-form")
  ) {
    loginTab.classList.replace("inactive-tab", "active-tab");
    registerTab.classList.replace("active-tab", "inactive-tab");
    loginForm.classList.replace("inactive-form", "active-form");
    registerForm.classList.replace("active-form", "inactive-form");
  }
});

// Login and Register Forms

// Login form
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  let loginEmail = document.getElementById('login-email').value;
  let loginPassword = document.getElementById('login-password').value;

  if (loginEmail === '' || loginPassword === '') {
    alert('Please fill out all fields');
    return;
  } else {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
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
});

const registerEmail = document.getElementById('regist-email');
const registerPassword = document.getElementById('regist-password');
const registerPasswordConfirm = document.getElementById('regist-password2');