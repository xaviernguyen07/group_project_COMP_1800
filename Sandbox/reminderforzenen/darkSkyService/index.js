const fetch = require('node-fetch')

const dsKey = "03c38bf0d83946fe44d22710353f13a1";

//Function for grabbing darksky data.
async function darkSky(latitude, longitude) {
  const fetchResponse = await fetch(
    `https://api.darksky.net/forecast/${dsKey}/${latitude},${longitude}`
  );
  const data = await fetchResponse.json();
  return data;
}


module.exports = darkSky;