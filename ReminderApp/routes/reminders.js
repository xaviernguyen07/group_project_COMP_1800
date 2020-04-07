const express = require('express');

const router = express.Router();

const darkSky = require("../darkSkyService");

const Reminder = require('../models/reminder');

const protectedRoutes = require('../middlewares/protectedRoutes');


router.get('/empty_page', (req, res, next) => {
    res.render('partials/empty_page');
});
router.post('/empty_page', (req, res) => {
    console.log("hi")
    res.redirect("/");
});


// create subpage and link to the profile
router.get('/:postId', async(req, res) => {
    try {
        const reminderItem = await Reminder.findById(req.params.postId)
        res.render('partials/subpage', { reminderItem: reminderItem })
            // consres.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post("/:postId", async(req, res) => {
    try {
        const reminderToFind = await Reminder.findById(req.params.postId)
            // console.log(reminderToFind.tags);
            // dt = new Date(req.body.date + ' ' + req.body.time);
            // reminderToFind.title = req.body.title;
            // reminderToFind.datetime = dt;
            // reminderToFind.subtask = req.body.subtask;
        let add_tag = req.body.tag;
        if (typeof add_tag != "undefined" && add_tag != "") {
            reminderToFind.tags.push(add_tag);
        }
        const reminderItem = await reminderToFind.save()
            // console.log(reminderItem.tags);
        res.render('partials/subpage', { reminderItem: reminderItem })
        res.redirect('/users/profile/' + reminderItem.id)
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:postId/update', async(req, res) => {
    try {
        const reminderItem = await Reminder.findById(req.params.postId)
        res.render('partials/subpage', { reminderItem: reminderItem })
            // consres.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});


router.post("/:postId/update", async(req, res) => {
    try {

        const reminderToFind = await Reminder.findById(req.params.postId)
        dt = new Date(req.body.date + ' ' + req.body.time)
        reminderToFind.title = req.body.title
        reminderToFind.datetime = dt
        reminderToFind.subtask = req.body.subtask

        const reminderItem = await reminderToFind.save()
        res.render('partials/subpage', { reminderItem: reminderItem })

        res.redirect('/users/profile/' + reminderItem.id)
    } catch (err) {
        res.json({ message: err });
    }
})

// Creating one
router.post('/', (req, res, next) => {
    dt = new Date(req.body.date + ' ' + req.body.time)
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
});

router.get('/:postId/delete', async(req, res) => {
    const reminderItem = await Reminder.findById(req.params.postId).then(() => {
        res.render('partials/subpage', { reminderItem: reminderItem })
    })
});



router.post('/:postId/delete', async(req, res) => {
    try {
        const removePost = await Reminder.remove({ _id: req.params.postId })
        console.log(removePost);
        //res.redirect('/users/profile');
        location.reload();
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:postId/delete', (req, res, next) => {
    location.reload();
});

router.get('/empty_page/a', async(req, res, next) => {
    const reminders = await Reminder.find({ username: req.session.currentUser.username });
    // console.log(reminders);
    res.render('partials/profile', { user: req.session.currentUser, reminders: reminders });
});

router.post('/empty_page/a', async(req, res) => {
    try {
        let reminders = req.body.reminder;

        reminders.shift();
        // console.log(reminders);


        for (let i = 0; i < reminders.length; i++) {
            const removePost = await Reminder.deleteOne({ username: req.session.currentUser.username, title: reminders[i] })
        }

        res.redirect('/users/profile');

    } catch (err) {

        res.json({ message: err });
    }
});

module.exports = router;