/*Minimum required for darkSky weather report grabbing.

This MUST BE DONE SERVERSIDE!!! Any request made to darkSky will be blocked
unless it abides by CORS. Easiest way to abide by cors is to send the request from node.js

That means to implement a call to darksky we require at the very least a node
server, and then optionally some html/js for the client to display the results.

This example will demonstrate how to pass client variables / information to the server
through request parameters. That means the client info actually comes along inside the http 
request.

Im using one server.js and one .html file to submit a get request
and attach some parameters to it.


Asynch function. This gets semi complicated so heres a semi shit explanation. 
This function uses promises, but more than one.
both 'fetch' and '.json' return promises. By declaring the whole
function as async, it allows us to use the 'await' syntax.
The 'await' syntax is basically shorthand for explictly calling '.then',
It is technically syntactic sugar like list comprehension in python,
but it makes things SO much more readable.


So To outline the actual program:
  1. First we must know our dsKey because this is like our password to access the api
  2. We use 'fetch' to send a get request to a url which contains our dsKey and the longitude and latitude
  3. we 'await' the promise returned from fetch to be resolved, when its resolved we assign it to FetchResponse
  4. we 'await' the promise returned from .json() to be resolved, when its resolved we assign the return to data.
  5. Data holds all the weather info so we can further sort from there.

 */




 //Minamal server

 //A few dependancy
const env = require('dotenv')
const express = require('express');
const app = new express();
const PORT = env.PORT | 3000
const fetch = require('node-fetch')

//Start the server
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}!!`));



//This is the page which has the for to input latituFe and longitude values
// I should replace .sendFile with .render but im takin this one step at a time.
app.get('/', (request, response) => {
  response.sendFile("darkSky.html", {root: __dirname});
});

//This endpoint will handle the url that gets submitted upon clicking the button,
// it will include the lat and lon in the url.

// app.get('/dark_sky.php?', (request, response) => {
//   response.sendFile("darkSky.html", {root: __dirname});
// });

//Example for accessing client request paramters: from basic get request
app.get('/dark_sky.php?', (request, response) => {
  console.log("req1");
  console.log(`Server recieved ${request.query.longitude} and ${request.query.longitude} from client`);
  response.send("Server recieved request from client with parameters" + request.query.latitude +", " + request.query.longitude)})


const dsKey = "03c38bf0d83946fe44d22710353f13a1";

let latitude = 30.0;
let longitude = -45.0;

//Function for grabbing darksky data.
async function darkSky(latitude, longitude) {
  const fetchResponse = await fetch(
    `https://api.darksky.net/forecast/${dsKey}/${latitude},${longitude}`
  );
  const data = await fetchResponse.json();
  return data;
}

//This one just gets a response from darksky
//
// This is where we actually get the data
let darkSkyResults = darkSky(latitude, longitude)
.then(data => {
  console.log("Response received from darksky", data) //The actualt response
  console.log("Getting precip probability", data.daily.data)}) // The daily weather forecast days 1 -7
.catch(err => console.log(err))


//This one gets the probability of rain for each day
darkSky(latitude, longitude)
.then(data => {console.log(data.daily)
  let dailyl = [];
  for ( let i = 0; i < 8; i++){
    dailyl[i] = data.daily.data[i].precipProbability;}
  console.log("Probability of percipitation per day", dailyl)
})
.catch(err => console.log(err));