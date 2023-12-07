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


document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch(`/ratings/ratings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        if (!result) {
            console.log('No ratings');
        }
        console.log(result);

        result.forEach((row) => {
            const ratingContainer = document.createElement('div');
            ratingContainer.classList.add('rating');
            const ratingText = document.createElement('div');
            ratingText.classList.add('rating-text');
            const ratingHeader = document.createElement('div');
            ratingHeader.classList.add('rating-header');
            const ratingStars = document.createElement('div');
            ratingStars.classList.add('rating-stars');
            const stars = row.stars;
            for (let i = 0; i < stars; i++) {
                const star = document.createElement('i');
                star.classList.add('fas');
                star.classList.add('fa-star');
                ratingStars.appendChild(star);
            }
            ratingContainer.appendChild(ratingStars);
            const ratingName = document.createElement('div');
            ratingName.classList.add('username');
            ratingName.innerText = row.user_id;
            ratingContainer.appendChild(ratingName);

            if (!row.review_header) {
                row.review_header = 'No review header';
                ratingHeader.innerText = row.review_header;
            }
            ratingHeader.innerText = row.review_header;
            ratingText.innerText = row.review_text;
            ratingContainer.appendChild(ratingHeader);
            ratingContainer.appendChild(ratingText);
            document.getElementById('ratings').appendChild(ratingContainer);
        })

    } catch (e) {
        console.log(e.message);
    }
}
)
