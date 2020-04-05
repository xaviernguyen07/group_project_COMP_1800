const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const bcryptSalt = 10;

const darkSky = require("../darkSkyService");

const User = require('../models/user');

const protectedRoutes = require('../middlewares/protectedRoutes');

const Reminder = require('../models/reminder');


/* GET users listing. */
router.get('/', (req, res, next) => {

    res.render('partials/users', { errorMessage: undefined });

});

// Scenario: User can only access dark sky API upon login
router.get('/profile', protectedRoutes, async(req, res) => {
    const latitude = 30.0;
    const longitude = -45.0;
    let darkSkyResults = await darkSky(latitude, longitude);
    const reminders = await Reminder.find({username: req.session.currentUser.username});
    // console.log(reminders);

    res.render('partials/profile', { user: req.session.currentUser, data: darkSkyResults, reminders: reminders });

});

router.get('/profile', protectedRoutes, async(req, res) => {
    res.render('partials/profile', { reminders: Reminder })
});

router.get('/signup', (req, res, next) => {
    res.render('partials/signup', { errorMessage: undefined });
});

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    if (username === '' || password === '') {
        res.render('partials/signup', {
            errorMessage: 'Indicate a username and a password to sign up'
        });
        return;
    }
    User.findOne({ username })
        .then((user) => {
            if (!user) {
                User.create({
                        username,
                        password: hashPass,
                    })
                    .then(() => {
                        res.redirect('/users');
                    })
                    .catch(error => {
                        next(error);
                    })
            } else {
                res.render('partials/signup', { errorMessage: "User already exists." });
            }
        })
        .catch(error => {
            next(error)
        });


});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    if (username === '' || password === '') {
        res.render('partials/users', {
            user: undefined,
            errorMessage: 'Indicate a username and a password to sign up'
        });
        return;
    }

    User.findOne({ username })
        .then((user) => {
            if (!user) {
                res.render('partials/users', {
                    user: undefined,
                    errorMessage: "The username doesn't exist"
                });
                return;
            }
            if (bcrypt.compareSync(password, user.password)) {
                // Save the login in the session!
                req.session.currentUser = user;
                res.redirect('/users/profile');
            } else {
                res.render('partials/users', {
                    user: undefined,
                    errorMessage: 'Incorrect user or password'
                });
            }
        })
        .catch(error => {
            next(error)
        })
});

router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        // cannot access session here
        res.redirect('/users');
    });
});


// // find all data
// router.get('/', async(req, res) => {
//     try {
//         const posts = await User.find();
//         res.json(posts);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });




module.exports = router;