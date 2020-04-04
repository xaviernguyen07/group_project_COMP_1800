# Authorization Example with JWT
  * To test we need both a client and a server
  * `node app.js` will start the server 
  * `python3 RUN_THIS.py` is a program that simulates client activity. 
  * RUN_THIS basically simulates someone going on a browser and sending some requests to our server
    * This is done to ensure that the request is always correct and allows us to focus on what the server does in response to a correctly formatted request.
    1. RUN_THIS will first obtain a JWT token from a nonprotected endpoint via post request
    1. Then it trys to access a protected endpoint via post request that includes the token recieved in step1
    1. Then it waits 30 seconds and tries to make the same request (as in step 2) but it should fail because I set tokens to expire in 30 seconds.

# To start:
  1. Open Two terminal windows
  1. in first terminal `$ node app.js`
  1. in other terminal enter `$ python3 RUN_THIS.py`
