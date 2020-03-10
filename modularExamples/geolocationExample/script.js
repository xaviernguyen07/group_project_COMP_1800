/* Super simple absolute minumum required to grab longitude and latitude of client browser. Note client
 * must explicitly allow permission. */

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
}

getLocation();
setTimeout(function() {
  alert(`Your latitude is ${lat} and Your longitude is ${lon}`);
}, 5000); // allow 3 seconds for user to allow location
