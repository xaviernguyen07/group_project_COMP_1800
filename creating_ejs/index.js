const express = require("express")
const app = express();
const ejslayouts = require("express-ejs-layouts")
const reminderController = require("./controllers/reminder_controller");


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

app.get("/reminder", reminderController.main_page)

app.get("/reminder/", reminderController.new)

// app.get("/reminder/:id", reminderController.listOne)

// app.get("/reminder/:id/edit", reminderController.edit)

app.post("/reminder/", reminderController.create)




// listen localhost4000
app.listen(4000)