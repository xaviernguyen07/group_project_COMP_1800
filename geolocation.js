
  let lat;
  let lon;
  let JWT;


  async function getJWT(){
    const response = await fetch('http://localhost:3000/login',{
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const body = await response.json();
    return body;
    }

    getJWT()
    .then(data => {
      JWT = data;
    })
    .catch(err => console.log(err))



  function getLocation() {

      
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } 
  }
  
  function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
     console.log(lat);
     console.log(lon)
  }
 

  //getLocation();
  