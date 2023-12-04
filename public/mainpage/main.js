import { response } from "express";
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
    } else if (user.user_level_id === 2) {
      userButton.href = '/my-account';
    }
  } else {
    removeUserDataFromDom();
  }
};

const contentTabs = document.getElementById('content-tabs');
contentTabs.addEventListener('click', (evt) => {
  const clickedTab = evt.target.closest('.content-tab');
  if (clickedTab && clickedTab.classList.contains('content-tab')) {
    const expanded = clickedTab.classList.contains('expanded');
    const tabs = contentTabs.querySelectorAll('.content-tab');
    tabs.forEach(tab => {
      tab.classList.remove('expanded');
    });
    const info = contentTabs.querySelectorAll('.text');
    info.forEach(text => {
      text.classList.remove('active')
    });
    if (!expanded) {
      clickedTab.classList.add('expanded');
      const clickedIinfo = clickedTab.querySelectorAll('.text');
      clickedIinfo.forEach(text => {
        text.classList.add('active')
      })
    }
  }
});

const craftPizza = document.getElementById('button-7');
craftPizza.addEventListener('click', () => {
  window.location.href = '/make-your-pizza';
});

const offers = document.getElementById('offers');
offers.addEventListener('click', () => {
  window.location.href = '/pick-a-pizza-club';
});

// const prompts = document.querySelectorAll('.pizza-selector');
// prompts.forEach(prompt => {
//   prompt.addEventListener('click', async function () {
//     console.log('clicked', prompt.id[7]);
//     const id = prompt.id[7];
//     try {
//       const response = await fetch('/mainpage', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//       const result = await response.json();
//       console.log(result);
//     } catch (error) {
//       console.error('Error sending data to the server:', error);
//     }
//   });
// });

fetch('/')
    .then(response => response.text())
    .then(html => {
        // Insert the fetched HTML into the DOM
        document.body.innerHTML = html;

        // You can now manipulate the DOM or perform other actions as needed
        console.log('Page loaded with pizza names', response);
    })
    .catch(error => console.error('Error loading main page:', error));