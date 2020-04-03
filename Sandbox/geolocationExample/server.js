const geolocation = require('geolocation')

navigator.geolocation.getCurrentPosition(function(location) {
   latt = location.coords.latitude;
   long = location.coords.longitude;
   console.log(latt,long);
}); 