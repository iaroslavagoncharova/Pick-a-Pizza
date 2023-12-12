import onCommonReload from "../common.js";

window.onload = () => {
  onCommonReload();
};

// if any set of ingredients already exists, remove it and open a blank make a pizza page
const craftPizza = document.getElementById('make-a-pizza');
craftPizza.addEventListener('click', () => {
  localStorage.removeItem('selectedPizzaIngredients');
  window.location.href = '/make-your-pizza';
});

document.addEventListener('DOMContentLoaded', async function () {
    // get all users' ratings
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

        // create a rating container for each rating

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

            // create stars for each rating
            for (let i = 0; i < stars; i++) {
                const star = document.createElement('i');
                star.classList.add('fas');
                star.classList.add('fa-star');
                ratingStars.appendChild(star);
            }
            ratingContainer.appendChild(ratingStars);
            let totalStars = 0;
            result.forEach((row) => {
                totalStars += row.stars;
            })

            // calculate average rating
            const averageStars = totalStars / result.length;
            const averageStarsContainer = document.getElementById('average-rating');
            averageStarsContainer.innerText = `Average Rating: ${averageStars.toFixed(1)}★`

            // if there's no review header, display a line
            if (!row.review_header) {
                row.review_header = '-----';
                ratingHeader.innerText = row.review_header;
            }
            ratingHeader.innerText = row.review_header;
            ratingText.innerText = row.review_text;
            ratingContainer.appendChild(ratingHeader);
            ratingContainer.appendChild(ratingText);

            // get username for each rating
            const ratingName = document.createElement('div');
            ratingName.classList.add('username');
            const getNames = async () => {
                const response = await fetch(`/ratings/${row.user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                console.log(result);
                ratingName.innerText = result[0].username;
            }
            getNames();
            ratingContainer.appendChild(ratingName);

            document.getElementById('ratings').appendChild(ratingContainer);
        })
    } catch (e) {
        console.log(e.message);
    }
}
)

// submit a review

const submitReview = document.getElementById('submit-review');
submitReview.addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const stars = document.querySelector('input[name="rating"]:checked').value;
    console.log(stars);
    const reviewHeader = document.getElementById('header').value;
    const reviewText = document.getElementById('review').value;
    const rating = {
        stars: stars,
        review_header: reviewHeader,
        review_text: reviewText,
        user_id: user.user_id,
    }
    console.log(rating);
    // post a review
    try {
        const response = await fetch(`/ratings/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rating),
        });
        const result = await response.json();
        console.log(result);
        if (result) {
            window.location.href = '/ratings';
        }
    } catch (e) {
        console.log(e.message);
    }
}
)