 //Minamal server

 //A few dependancy
const env = require('dotenv')
const express = require('express');
const app = new express();
const PORT = env.PORT | 3000
const bodyParser = require('body-parser')
const connectString = 'mongodb+srv://root:toor@comp1800-wninv.azure.mongodb.net/test?retryWrites=true&w=majority';
const MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//Start the server
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}!!`));



app.get('/', (request, response) => {
  response.sendFile("index.html", {root: __dirname});
});


//Example for accessing client request paramters: from basic get request
app.post('/dark_sky.php?', (request, response) => {
    //pull login info from request body
    const data = request.body;
    const userName = request.body.username;
    const passWord = request.body.password;

    //Authenticate / check db for this user here
    //auth = authenticateUser(userName, passWord);

    //if(auth){
    //console.log("Authenticated!")}
    //else{
    //    console.log("unable to authenticate you");
    //}
    
    
    console.log("request body:", data)
  //console.log(`Server recieved Username:${data.username} and Password:${data.password} from client`);
  response.send(`Server recieved request from client with formData = ${JSON.stringify(data)}`);
});


//function authenticateUser(userName, passWord){}

function testDB(connectString){
    //Attempt to connect to database and print contents
 
    const uri = "mongodb+srv://root:toor@comp1800-wninv.azure.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
            //Traverse into collection
          const collection = client.db("reminder_app").collection("reminders");
          //Query db for items and log each item from array
          console.log(collection.find().toArray((err, results) =>{
              console.log(err);
              console.log(results)}));

          // close connection
           client.close();
        
        //
 })
    console.log("connected!");

}

testDB();
