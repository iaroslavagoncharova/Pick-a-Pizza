import onCommonReload from "../common.js";
import {checkDevice } from "../menu-button.js";

window.onload = () => {
  'use strict';
  onCommonReload();
  checkDevice();
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
            <strong>Take</strong> ${leg.mode}<br>
            <strong>From stop:</strong> ${leg.from.stop.name} (${leg.from.stop.code})<br>
            <strong>To stop:</strong> ${leg.to.stop.name} (${leg.to.stop.code})<br>
            <strong>${leg.mode === 'TRANSIT' ? 'Vehicle' : 'Direction'}:</strong> ${`Route ${leg.route.shortName} towards ${leg.route.longName}`} <br>
            <strong>Approximate time:</strong> ${time} min <br>
          `;
          } else {
            // create popup content for walking
            const roundDistance = Math.round(leg.distance);
            popupContent = `
            <strong>Walk</strong><br>
            <strong>From stop:</strong> ${leg.from.stop ? `${leg.from.stop.name} (${leg.from.stop.code})` : `${leg.from.name}`}<br>
            <strong>To stop:</strong> ${leg.to.stop ? `${leg.to.stop.name} (${leg.to.stop.code})` : `${leg.to.name}`}<br>
            <strong>Distance:</strong> ${roundDistance} m <br>
            <strong>Approximate time:</strong> ${time} min <br>
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
