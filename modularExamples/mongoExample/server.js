 //Minamal server

 //A few dependancy
require('dotenv').config()
const saltRounds = 10;
const bcrypt = require('bcrypt');
const express = require('express');
const app = new express();
const PORT = process.env.PORT | 3000
const bodyParser = require('body-parser')
const MONGOURI = process.env.MONGOURI;
const MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//Start the server
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}!!`));



app.get('/', (request, response) => {
  response.sendFile("index.html", {root: __dirname});
});


//Example for accessing client request paramters: from basic get request
app.post('/dark_sky.php?', async (request, response) => {
    //pull login info from request body
    const data = request.body;
    const userName = request.body.username;
    const passWord = request.body.password;

    let hashedUsername;
    let hashedPassword;
    

    //Get username Hash
//Get password hash

await bcrypt.hash(passWord, saltRounds, async (err, hashed) =>{
    if(err) () => console.log(err);
    else{hashedPassword = hashed 
    //console.log(hashedPassword)
    ;};

    authUser(MONGOURI, userName, passWord);
});
    //const hashedPassWord = await bcrypt.hash(passWord);



    //Authenticate / check db for this user here
    //auth = authenticateUser(userName, passWord);

    //if(auth){
    //console.log("Authenticated!")}
    //else{
    //    console.log("unable to authenticate you");
    //}
    
    
    //console.log("request body:", data)

    
  //console.log(`Server recieved Username:${data.username} and Password:${data.password} from client`);
  response.send(`Server recieved request from client with formData = ${JSON.stringify(data)}`);

})

//function authenticateUser(userName, passWord){}

function authUser(connectString, userName, passWord){
    //Attempt to connect to database and print contents
    console.log("Connecting to mongo db...");
 
    const client = new MongoClient(connectString, { useNewUrlParser: true} );

    client.connect(err => {
            //Traverse into collection
          console.log("connected to mongoDB");
          const collection = client.db("reminder_app").collection("reminders");
          //Query db for items and log each itemn from array
          console.log(collection.find({Username:userName}).toArray((err, results) =>{
            
            if(err){console.log(err)}

            if(results.length === 0){
                console.log("Unable to authenticate user, this user not in database");
            }
            else{
                //console.log("Found userName in db... verifying pword", results);
                //console.log(`Comparing ${passWord} and ${results[0].Password}`);
                bcrypt.compare(passWord, results[0].Password, function(err, result){
                   // console.log(err, result)
                    if(result === true){
                        console.log("Authenticated!")
                    }
                    else{
                        console.log("Username in DB but incorrect password")
                    }
                })

            }}));

          // close connection
           client.close();
        
        //
 })

}

