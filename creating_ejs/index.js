const express = require("express")
const app = express();
const ejslayouts = require("express-ejs-layouts")
const reminderController = require("./controllers/reminder_controller");


//mongo path
require('dotenv').config()
const MONGOURI = process.env.MONGOURI;

//body-parser setup
const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

//mongoose setup
const mg = require("mongoose");
mg.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err)
})
let db = mg.connection;

//bcrypt stuff
const saltRounds = 10;
const bcrypt = require('bcryptjs');

app.use(express.static(__dirname + "/public"));
app.use(ejslayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))


app.get("/", function(req, res) {
    res.render('reminder/login')
})

app.get("/sign_up", function(req, res) {
    res.render('reminder/sign_up')
})

app.get('/empty_page', (req, res) => {
    res.render('reminder/empty_page')
})

app.post('/sign_up', (req, res) => {

    // hash password then set it to Password in req.body
    let passWord = req.body.Password[0]

    bcrypt.hash(passWord, saltRounds, function(err, hashed) {
        if (err)() => console.log(err);
        else {
            hashedPassword = hashed;
            console.log(hashed)
        };
    });

    const hashedPassWord = bcrypt.hash(passWord);
    req.body.Password = hashedPassWord;
    req.body.Title = 'Sample reminder';
    req.body.Description = 'Sample reminder description';
    req.body.Tags = [{ color: 'FE6C6C', name: 'Important' }, { color: '#926CFE', name: 'Family Tasks' }];
    req.body.Subtasks = ['Subtask1', 'Subtask2'];
    req.body.Date = new Date();


    // insert user to database
    db.collection('reminders').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('saved to database');
        res.redirect('/reminder')
    })
})


app.get("/reminder", reminderController.list)

app.get("/reminder/", reminderController.new)

app.get("/reminder/:id", reminderController.edit_tag)

app.get("/reminder/:id", reminderController.listOne)

app.post("/reminder/:id", reminderController.update_tag)

app.post("/reminder/", reminderController.create)

app.post("/reminder/delete/:id", reminderController.delete)

app.get("/reminder/:id", reminderController.edit)

app.post("/reminder/update/:id", reminderController.update) // suggestion for class: look into put and post





// listen localhost7000
app.listen(7000, () => {
    console.log("Server running. Visit: localhost:7000/reminder in your browser 🚀");
})