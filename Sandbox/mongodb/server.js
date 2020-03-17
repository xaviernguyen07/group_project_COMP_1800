//express setup
const express = require("express");
const app = express();


//ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//body-parser setup
const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));


//mongoose setup
const mg = require("mongoose");
mg.connect("mongodb://localhost:27017/",  { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
   if (err) return console.log(err)
   app.listen(3000, () => {
     console.log('listening on 3000')
   })
})
let db = mg.connection; 

// //create a model
// let Schema = mg.Schema;

// let SomeModelSchema = new Schema({
//    post: String,
//    date: Date
// });
// //Mongoose will create the database collection called SomeModel, using the schema called SomeModelSchema
// let SomeModel = mongoose.model('SomeModel',SomeModelSchema);

app.get("/", (req, res) => {
   db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {quotes: result})
    })
});

app.post('/quotes', (req, res) => {
   //insert
   if ((req.body.name != '') && (req.body.quote != '')){
      db.collection('quotes').insertOne(req.body, (err, result) => {
         if (err) return console.log(err);

         console.log('saved to database');
         res.redirect('/')
      })
   }

   //retreive
   db.collection('quotes').find().toArray(function(err, results) {
      console.log(results);
   })
});
