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


// app.get("/reminder/reminder_subpage", function(req, res) {
//     res.render('reminder/reminder_subpage')
// }, reminderController.list1)

app.get("/reminder", reminderController.list)

app.get("/reminder/", reminderController.new)

// app.get("/reminder/2", reminderController.list_tag)

// app.get("/reminder/2", reminderController.new_tag)


app.get("/reminder/:id", reminderController.edit_tag)

app.get("/reminder/:id", reminderController.listOne)

app.post("/reminder/:id", reminderController.update_tag)

app.post("/reminder/", reminderController.create)

app.post("/reminder/delete/:id", reminderController.delete)


// app.get("/reminder/:id", reminderController.listOne)

// app.get("/reminder/:id/edit", reminderController.edit)






// listen localhost4000
app.listen(4000)