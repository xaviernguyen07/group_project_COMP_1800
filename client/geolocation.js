
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } 
  }
  
  function showPosition(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
  
  }
  
  showPosition();
  console.log(lat);
  
  