/* This Example shows just Authorization with json web tokens.
Authorization =! Authentication... Authentication is making sure a user
is who they say the are. Authorization on the other hand is making sure any user
is allowed to access the stuff they are requesting. 

In general, a user is authenticated via username / password at most one time (hopefully) per token lifetime.
Authorzation, however, must happen serverside upon every request from any client that gets sent to a protected endpoint.
A protected endpoint in our case is just any page of our web app that should only be available after a user loge in.

Note: index, sign in, sign up are by default NOT protected endpoints.


The Protocol For Authorization using JWT tokens is as follows:

    1) User makes a request to a /login route and recieves a authorizationToken.
    (This is Where we WOULD authenticate, if we were including it in this example. Pretty simply, I left out authentication 
        in order to put it in its own module. But in reality we want to authenticate right here, because we never want to give a token to a user that isnt
        logged in.)
    
    2) Now that client Has recived an authToken, client must include that token in his/her request to acces a protected endpoint.
    3) Client sends authToken within header of request to /protected
    4) Server checks the digital signature (verifyToken) upon recieving request (Thats why its middleware, we want it to happen on EVERY request)
    5) If signature checks out, send back the content client is requesting.
    6) Else, signature is invalid and send an error back.
*/

const express = require("express");
const JWT = require("jsonwebtoken");
const PORT = process.env.PORT || 3000;
const jwtExpiryTime = "30s";

const app = express();

app.get("/", (req, res) => {
  res.send(
    "Send a request to /api/login to recieve a token <br> Then send a request to /api/protected including the token you recieved in the request header as <br> <pre> <br>Authorization: Bearer token_here</pre>"
  );
});

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the Api!"
  });
});

//This is the route We are trying to protect
//VerifyToken is considered middle ware
app.post("/api/protected", verifyToken, (req, res) => {
  //Gotta verify the token that shouold be included by client in request
  JWT.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403); // send an error
    } else {
      res.json({
        message: "Secreit stuff here...",
        authData
      });
    }
  });
});

// Handles Post request to localhost:3000/api/login
// Sends back a JWT TOKEN
app.post("/api/login", (req, res) => {
  //Mock user to test shit

  //We construct a user object with the shit from the request
  const user = {
    id: 1,
    username: req.query.username,
    email: req.query.email,
  };

  JWT.sign(
    { user: user },
    "secretKey",
    { expiresIn: jwtExpiryTime },
    (err, token) => {
      res.json({
        token
      });
    }
  );
});

//TOKEN FORMAT:
// Authoriztion: Bearer <access_token>
// So we check if its undefinied first

// Verify Token Middleware
function verifyToken(req, res, next) {
  //Get auth header value from token
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    //Split 'Bearer' from access_token
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1]; // Array constains ['Bearer', <access_token>]
    req.token = bearerToken; // Set the token we recieved to be included in shit
    next();
  } else {
    //No Token was included in the request
    //Send back an error
    res.sendStatus(403);
  }
}

app.listen(PORT, () => console.log(`server started on port ${PORT}!`));
