const express = require('express');

const router = express.Router();

const darkSky = require("../darkSkyService");

const Reminder = require('../models/reminder');

const protectedRoutes = require('../middlewares/protectedRoutes');


router.get('/empty_page', (req, res, next) => {
    res.render('partials/empty_page');
});
router.post('/empty_page', (req, res )=>{
    console.log("hi")
    res.redirect("/");
})

// router.get("/reminder", (req, res, next) => {
//     res.render('partials/profile', { reminders: Reminder })
// });

// router.get("/reminder/", (req, res, next) => {
//     res.render('partials/profile')
// });

router.get("/:id", (req, res, next) => {
    let reminderToFind = req.params.id;
    let searchResult = Database.cindy.reminders.find(function(reminder) {
        return reminder.id == reminderToFind; // good test question for students what happens if I put ===
    })
    if (searchResult != undefined) {
        res.render('partials/subpage', { reminderItem: searchResult })
    } else {
        res.render('partials/empty_page', { reminders: Reminder })
    }
})

router.get('/', (req, res, next) => {
    res.render('partials/profile');
});

// Creating one
router.post('/', (req, res, next) => {
    dt = new Date(req.body.date + ' ' + req.body.time)
    
    console.log(req.session.currentUser.username);
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.body.subtask);
    console.log(req.body.subtaskArray);
    console.log(dt);

    Reminder.create({
        username: req.session.currentUser.username,
        title: req.body.title,
        description: req.body.description,
        datetime: dt,
        subtask: req.body.subtask,
        tags: []
    }).then(() => {
        res.redirect('/users/profile');
    })
    .catch(error => {
        next(error);
    })
    // try {
    //     const newReminder = await reminder.save()
    //     res.status(201).json(newReminder)
    //     res.redirect('/users/profile');
    // } catch (err) {
    //     res.status(400).json({ message: err.message })
    // }
});



module.exports = router;