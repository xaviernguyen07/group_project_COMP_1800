/*Minimum required for darkSky weather report grabbing.

This MUST BE DONE SERVERSIDE!!! Any request made to darkSky will be blocked
unless it abides by CORS.

Easiest way to abide by cors is to send the request from node.js

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



const dsKey = "03c38bf0d83946fe44d22710353f13a1";
let latitude = 100;
let longitude = 100;

async function darkSky(lat, long) {
  const fetchResponse = await fetch(
    `https://api.darksky.net/forecast/${dsKey}/${latitude},${longitude}`
  );
  const data = await fetchResponse.json();
  return data;
}


console.log(darkSky(latitude, longitude));