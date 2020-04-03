const express = require('express');

const router = express.Router();

const darkSky = require("../darkSkyService");

const Reminder = require('../models/reminder');

const protectedRoutes = require('../middlewares/protectedRoutes');


router.get('/empty_page', (req, res, next) => {
    res.render('partials/empty_page');
});

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
router.get('/abc', protectedRoutes, async(req, res) => {
    res.render('partials/profile', { reminders: Reminder })
});
// Creating one
router.post('/abc', (req, res, next) => {
    // const reminder = new Reminder({
    //     title: req.body.title,
    //     dat: req.body.date,
    //     time: req.body.time,
    //     Subtask: req.body.Subtask,
    //     tag: []
    // })
    dt = new Date(req.body.date + ' ' + req.body.time)
    
    console.log(req.session.currentUser);
    console.log(req.session.subtask);

    Reminder.create({
        username: req.session.currentUser,
        title: req.body.title,
        description: req.body.description,
        datetime: dt,
        subtask: req.body.subtask,
        tags: []
    }).then(() => {
        res.redirect('/');
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