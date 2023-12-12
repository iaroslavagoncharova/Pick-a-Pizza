import onCommonReload from "../common.js";

window.onload = () => {
  onCommonReload();
};

// getting itinraries from graphql and displaying them on the map
const apiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

const positionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

const error = (GeolocationPositionError) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    };
const success = async (position) => {
    try {
      const crd = position.coords;
      console.log(crd.latitude, crd.longitude);   
      // define graphql query to get itinerary     
      const graphqlQuery = `
      {
        plan(
            from: {lat: ${crd.latitude}, lon: ${crd.longitude}},
            to: {lat: 60.223850, lon: 24.758631},
        ) {
          itineraries{
            duration,
            legs {
              mode
              duration
              route {
                shortName
                longName
              }
              from {
                lat
                lon
                name
                stop {
                  code
                  name
                }
              },
              to {
                lat
                lon
                name
                 stop {
                  code
                  name
                }
              },
              distance
              legGeometry {
                length
                points
              }
            }
          }
        }
      }`;

// create map
const latitude = crd.latitude;
const longitude = crd.longitude;
var map = L.map('map').setView([latitude, longitude], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch(apiUrl, {
  // get itinerary from graphql using user's location and a hardcoded destination
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'digitransit-subscription-key': '111c975432224cbd9c5dd1c49a9c62a9'
    },
    body: JSON.stringify({ query: graphqlQuery }),
})
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.data.plan.itineraries.forEach((itinerary, itineraryIndex) => {
        // create popup content for each itinerary
        itinerary.legs.forEach((leg) => {
          const startPoint = [leg.from.lat, leg.from.lon];
          const endPoint = [leg.to.lat, leg.to.lon];
          let popupContent;
          const time = Math.round(leg.duration / 60);
          if (leg.mode) {
          if (leg.mode != 'WALK') {
            // create popup content for public transport
            popupContent = `
            <strong>Ota</strong> ${leg.mode}<br>
            <strong>Pysäkiltä:</strong> ${leg.from.stop.name} (${leg.from.stop.code})<br>
            <strong>Pysäkkiin:</strong> ${leg.to.stop.name} (${leg.to.stop.code})<br>
            <strong>${leg.mode === 'TRANSIT' ? 'Vehicle' : 'Reitti'}:</strong> ${` ${leg.route.shortName} suuntaan ${leg.route.longName}`} <br>
            <strong>${time} min </strong> <br>
          `;
          } else {
            // create popup content for walking
            const roundDistance = Math.round(leg.distance);
            popupContent = `
            <strong>Kävele</strong><br>
            <strong>Pysäkiltä:</strong> ${leg.from.stop ? `${leg.from.stop.name} (${leg.from.stop.code})` : `${leg.from.name}`}<br>
            <strong>Pysäkkiin:</strong> ${leg.to.stop ? `${leg.to.stop.name} (${leg.to.stop.code})` : `${leg.to.name}`}<br>
            <strong>Etäisyys:</strong> ${roundDistance} m <br>
            <strong> ${time} min</strong> <br>
          `;
          }
        
        // create polyline and circle for each itinerary
        const polyline = L.polyline([startPoint, endPoint], {
          color: getColor(itineraryIndex),
        }).addTo(map);
  
        const circle = L.circle(startPoint, {
          color: getColor(itineraryIndex),
          radius: 30,
        });
        circle.bindPopup(popupContent);

        circle.addTo(map).on('click', function () {
          this.openPopup();
        });
      }

    });
});

// get color for polyline
function getColor(index) {
  const colors = ['orange', 'green', 'darkred'];
  return colors[index % colors.length];
}
    })
    .catch(error => {
        console.error('Error:', error);
    });
  } catch (error) {
    throw new Error(error);
  }
}

// get user's location
navigator.geolocation.getCurrentPosition(success, error, positionOptions);

// if any set of ingredients already exists, remove it and open a blank make a pizza page
const craftPizza = document.getElementById('make-a-pizza');
craftPizza.addEventListener('click', () => {
  localStorage.removeItem('selectedPizzaIngredients');
  window.location.href = '/make-your-pizza';
});

document.addEventListener('DOMContentLoaded', async function () {
  // get prompts to display in dropdowns
  try {
   const response = await fetch('/prompts', {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
     },
   });

   if (response.ok) {
     const result = await response.json();
     console.log('Response:', result);

     // create a link for each prompt dropdown

     for (let i = 1; i <= 6; i++) {
       const dropdown = document.getElementById(`pizza-${i}`);
       dropdown.innerHTML = result[i - 1].prompt_name;

       dropdown.addEventListener('click', (function (pizzaId) {
         return function () {
           selectPizza(pizzaId);
         };
       })(i));
     }

      // fetching an ingredient set for a chosen prompt, saving it to local storage and redirecting to make a pizza page
     let selectedPizzaIngredients = [];

     async function selectPizza(pizzaId) {
       try {
         const response = await fetch(`/sets/${pizzaId}`, {
           method: 'GET',
           headers: {
             'Content-Type': 'application/json',
           },
         });

         if (response.ok) {
           const result = await response.json();
           console.log('Selected Pizza Ingredients:', result);
           selectedPizzaIngredients = result;

           if (localStorage.getItem('selectedPizzaIngredients')) {
             localStorage.removeItem('selectedPizzaIngredients');
           }

           localStorage.setItem('selectedPizzaIngredients', JSON.stringify(selectedPizzaIngredients));

           window.location.href = '/make-your-pizza';
         } else {
           console.error('Error getting data from the server:', response.status, response.statusText);
         }
       } catch (error) {
         console.error('Error getting data from the server:', error.message);
       }
     }
   } else {
     console.error('Error getting data from the server:', response.status, response.statusText);
   }
 } catch (error) {
   console.error('Error getting data from the server:', error.message);
 }
});