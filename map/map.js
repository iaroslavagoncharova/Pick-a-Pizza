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
            to: {lat: 60.175294, lon: 24.684855},
        ) {
          itineraries{
            duration,
            legs {
              mode
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


const subscriptionKey = '111c975432224cbd9c5dd1c49a9c62a9';

const source = 'hsl-map';
const zoom = 15;
const size = '';
const latitude = crd.latitude;
const longitude = crd.longitude;
const x = Math.floor((longitude + 180) / 360 * (2 ** zoom));
const y = Math.floor((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * (2 ** zoom));

const mapTileUrl = `https://cdn.digitransit.fi/map/v2/${source}/${zoom}/${x}/${y}${size}.png?digitransit-subscription-key=${subscriptionKey}`;
/*const style = generateStyle({
    sourcesUrl:  "https://cdn.digitransit.fi", // <-- You can override the default sources URL. The default is https://api.digitransit.fi/
    glyphsUrl: "", // Possibility to overwrite fonts url, an empty string does nothing
    spriteUrl: "", // Possibility to overwrite sprite url
    queryParams: [ // It's possible to add query parameters to urls, for example apikeys.
      {
        url: `/map/v2/${source}/${zoom}/${x}/${y}${size}.png?`, // Url pattern where the parameter should be added
        name: "digitransit-subscription-key",
        value: subscriptionKey,
        // --> &digitransit-subscription-key=my-secret-key
      },
    ],
  
    components: {
      // Set each layer you want to include to true
  
      // Styles
      base: { enabled: true }, // Enabled by default
      municipal_borders: { enabled: false },
      routes: { enabled: false },
      text: { enabled: true }, // Enabled by default
      subway_entrance: { enabled: false },
      poi: { enabled: false },
      park_and_ride: { enabled: false },
      ticket_sales: { enabled: false },
      stops: { enabled: false },
      citybikes: { enabled: false },
      ticket_zones: { enabled: false },
      ticket_zone_labels: { enabled: false },
  
      // Themes
      text_sv: { enabled: false },
      text_fisv: { enabled: false },
      text_en: { enabled: false },
      regular_routes: { enabled: false },
      near_bus_routes: { enabled: false },
      routes_with_departures_only: { enabled: true }, // Enabled by default. Doesn't do anything until routes is enabled.
      regular_stops: { enabled: false },
      near_bus_stops: { enabled: false },
      print: { enabled: false },
      greyscale: { enabled: false },
      simplified: { enabled: false },
      "3d": { enabled: false },
      driver_info: { enabled: false },
    },
  });
  
  const map = new mapboxgl.Map({
    style: style,
  });

*/
fetch(mapTileUrl)
    .then(response => {
        console.log('Response status:', response.status);
        return response.blob();
    })
    .then( blob => {
        const imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(blob);
        document.body.appendChild(imageElement);
    })
    .catch(error => {
        console.error('Error fetching map tile:', error);
    });

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
    })
    .catch(error => {
        console.error('Error:', error);
    });
  } catch (error) {
    throw new Error(error);
  }
}

navigator.geolocation.getCurrentPosition(success, error, positionOptions);