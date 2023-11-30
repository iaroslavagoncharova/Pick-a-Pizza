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

const latitude = crd.latitude;
const longitude = crd.longitude;
var map = L.map('map').setView([latitude, longitude], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch(apiUrl, {
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
        itinerary.legs.forEach((leg) => {
          const startPoint = [leg.from.lat, leg.from.lon];
          const endPoint = [leg.to.lat, leg.to.lon];
          let popupContent;
          const time = Math.round(leg.duration / 60);
          if (leg.mode) {
          if (leg.mode != 'WALK') {
            popupContent = `
            <strong>Take</strong> ${leg.mode}<br>
            <strong>From stop:</strong> ${leg.from.stop.name} (${leg.from.stop.code})<br>
            <strong>To stop:</strong> ${leg.to.stop.name} (${leg.to.stop.code})<br>
            <strong>${leg.mode === 'TRANSIT' ? 'Vehicle' : 'Direction'}:</strong> ${`Route ${leg.route.shortName} towards ${leg.route.longName}`} <br>
            <strong>Approximate time:</strong> ${time} min <br>
          `;
          } else {
            const roundDistance = Math.round(leg.distance);
            popupContent = `
            <strong>Walk</strong><br>
            <strong>From stop:</strong> ${leg.from.stop ? `${leg.from.stop.name} (${leg.from.stop.code})` : `${leg.from.name}`}<br>
            <strong>To stop:</strong> ${leg.to.stop ? `${leg.to.stop.name} (${leg.to.stop.code})` : `${leg.to.name}`}<br>
            <strong>Distance:</strong> ${roundDistance} m <br>
            <strong>Approximate time:</strong> ${time} min <br>
          `;
          }

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

navigator.geolocation.getCurrentPosition(success, error, positionOptions);