const express = require('express');

const router = express.Router();

const darkSky = require("../darkSkyService");

const Reminder = require('../models/reminder');

router.get('/empty_page', async(req, res, next) => {
    try {
        const reminders = await Reminder.find()
        res.json(reminders)
        res.render('partials/empty_page')
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
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

// Creating one
router.post('/abc/', async(req, res, next) => {
    const reminder = new Reminder({
        title: req.body.title,
        dat: req.body.date,
        time: req.body.time,
        Subtask: req.body.Subtask,
        tag: []
    })
    try {
        const newReminder = await reminder.save()
        res.status(201).json(newReminder)
        res.redirect('/users/profile');
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});



module.exports = router;