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

// router.get("/reminder", (req, res, next) => {
//     res.render('partials/profile', { reminders: Reminder })
// });

// router.get("/reminder/", (req, res, next) => {
//     res.render('partials/profile')
// });

// router.get("/:id", (req, res, next) => {
//     let reminderToFind = req.params.id;
//     let searchResult = Database.cindy.reminders.find(function(reminder) {
//         return reminder.id == reminderToFind; // good test question for students what happens if I put ===
//     })
//     if (searchResult != undefined) {
//         res.render('partials/subpage', { reminderItem: searchResult })
//     } else {
//         res.render('partials/empty_page', { reminders: Reminder })
//     }
// })

// router.get("/:postId", async(req, res) => {
//     try {
//         let reminderToFind = req.params.postId;
//         let searchResult = Database.cindy.reminders.find(function(reminder) {
//             return reminder.id == reminderToFind; // Why do you think I chose NOT to use === here?
//         })
//         res.render('patials/subpage', { reminderItem: searchResult })
//     } catch (err) {
//         res.json({ message: err });
//     }
// });


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
    // try {
    //     const reminderItem = await Reminder.findById(req.params.postId)
    //     res.render('partials/subpage', { reminderItem: reminderItem })
    // } catch (err) {
    //     res.json({ message: err });
    // }
    const reminderItem = await Reminder.findById(req.params.postId).then(()=>{
        res.render('partials/subpage', { reminderItem: reminderItem })
    })
});

// router.post("/:postId/delete", async(req, res) => {
//     res.redirect("/users/profile/empty_page");
// })

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

module.exports = router;