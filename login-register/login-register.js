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
