require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
//const fs = require('fs');
const path = require("path");
const fetch = require("node-fetch");
const database = require("./db.json");
const dsKey = "03c38bf0d83946fe44d22710353f13a1";
const ejs = require('ejs');

var fs = require("fs"); /* Put it where other modules included */
//var stuff = JSON.parse(fs.readFileSync("db.json", "utf8"));
let db;
let lon;
let lat;

//path.join("/sign_in");

app.use(express.json())
//
posts = [
	{username:"zenen"}
]

console.log(process.env.ACCESS_TOKEN_SECRET)

app.get('/protected', authenticateToken, (req, res) =>{
  console.log("Got get request with params", req.params)
 // res.send("You were authenticated!")
  let people = ["zenen"]
  html = ejs.render('<%= people.join(", "); %>', {people: people});
  res.send(html);
})


//This means sending a post request with params username=zenen
//wull return a json with your authentication token
app.post('/login', (req, res) => {

  //Auth here
	const username = req.body
  const user = { name: username}
 // console.log(res);
  // console.log(username)

	const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
	res.json({accessToken: accessToken})
})

//authenticate token

function authenticateToken(req, res, next){

	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(" ")[1]

	if (token == null) return res.sendStatus(401)

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
		if (err){
      //console.log(user)
			//console.log(err)
			return res.sendStatus(403)
    }
    console.log(user)
		req.user = user
		next()
	})
}




function authenticateUser(username, password, database) {
  let emailHash = hashFunc(username);
  let pwdHash = hashFunc(password);

  if (typeof database[emailHash] === "undefined") {
    console.log("This user is not in our db");
  } else {
    console.log(`User:${emailHash} Password:${pwdHash} Authenticated!`);
  }
}

function hashFunc(aString) {
  hash = "";

  for (i = 0; i < aString.length; i++) {
    hash += aString.charCodeAt(i);
  }
  return hash;
}

// async function getstuff() {
//   const fetchResponse = await fetch(`http://localhost:3000/db.json`);
//   const data = await fetchResponse.json();
//   return data;
// }

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/action_page.php", (req, res) => {
  if (authenticateUser(req.query.email, req.query.psw, database)) {
    res.sendfile("/darkSky.html", {root: __dirname});
  } else {
    res.sendFile("/sign_in.html", { root: __dirname });
  }
});

app.get("/darkSky", (req, res) => {

  res.sendFile("/darkSky.html", { root: __dirname });
  //console.log(req, res);});
});



app.get("/dark_sky.php", (req, res) => {

//   console.log(req.query.fname);
//   console.log(req.query.lname);

  let lat = req.query.fname;
  let lon = req.query.lname;

  darkSky(lat, lon)
	.then(data => {console.log(data.daily)
		dailyl = [];
		for ( let i = 0; i < 8; i++){
			dailyl[i] = data.daily.data[i].precipProbability;
		}
	res.send(dailyl);})

	.catch(err => console.log(err));


  //console.log(res.query);
});

app.post("/post", function(req, res) {
  console.log("Recieved a post request");
  console.log(req.params);
  res.send("Got a POST request");
});

//https://api.darksky.net/https://api.darksky.net/forecast/03c38bf0d83946fe44d22710353f13a1/30.0,30.0forecast/03c38bf0d83946fe44d22710353f13a1/30.0,30.0

app.get("/sign_in.html", (req, res) =>
  res.sendFile("/sign_in.html", { root: __dirname })
);

app.get("/sign_up.html", (req, res) =>
  res.sendFile("/sign_up.html", { root: __dirname })
);

app.get("/sign_in.html", (req, res) =>
  res.sendFile("/sign_in.html", { root: __dirname })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

async function darkSky(latitude, longitude) {
  const fetchResponse = await fetch(
    `https://api.darksky.net/forecast/${dsKey}/${latitude},${longitude}`
  );
  const data = await fetchResponse.json();
  return data;
}
function authenticateUser(username, password, database) {


  let emailHash = hashFunc(username);
  let pwdHash = hashFunc(password);

  if (typeof database[emailHash] === "undefined") {
    console.log("This user is not in our db");
    return false;
  } else {
    if (typeof database[emailHash] !== "undefined" && database[emailHash] === pwdHash) {
    console.log(`User:${emailHash} Password:${pwdHash} Authenticated!`);
    return true;}
  else{
    console.log("Incorrect password")
    return false;
  }
}
}

function addUser(username, password, database) {
  database[hashFunc(username)] = hashFunc(password);
  //Update filesystem db with changes reflected in db object
  fs.writeFile("./db.json", JSON.stringify(database), "utf8", function(err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("Database Has been updated with a new user");
  });
}

// async function getstuff() {
//   const fetchResponse = await fetch(`http://localhost:3000/db.json`);
//   const data = await fetchResponse.json();
//   return data;
// }

//let h = getstuff();
//console.log(h)

// async function getDB(dataBase){
// 	const response = await fetch(dataBase);
// 	const body = await response.json();
// 	return body;
//   }

//   getDB(__dirname + "/db.json")
//   .then(data => {
//     db = data;
//   })
//   .catch(err => {console.log(err)});

// darkSky(43.0, 45.0)
// .then(data => console.log((data.daily.summary)))
// .catch(err => console.log(err));

// console.log(database);




