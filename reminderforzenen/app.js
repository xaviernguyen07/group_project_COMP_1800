const createError = require('http-errors');
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config()
const MONGOURI = process.env.MONGOURI;


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const reminderRouter = require('./routes/reminders');


mongoose.connect(MONGOURI, { useNewUrlParser: true })
    .then(() => console.log('connected'))
    .catch(error => console.log('error', error));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'layout');
app.set('layout extractScripts', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/script.js', function(req, res) {
    res.render(__dirname + '/public/script.js');
});

app.get('/css/style.css', function(req, res) {
    res.render(__dirname + '/public/css/style.css');
});


app.use(session({
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60, // 1 day
    }),
    secret: 'some-string',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
}));

app.use((req, res, next) => {
    app.locals.currentUser = req.session.currentUser;
    next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/profile', reminderRouter);



// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('partials/error');
});

// require('dotenv/config');
// // check object
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Middleewares
// app.use(cors());
// app.use(bodyParser.json());

// // add path in postsRoute
// app.use('/posts', usersRouter)

app.post('/abc', (req, res) => {
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
    })
    res.redirect('/');
    // try {
    //     const newReminder = await reminder.save()
    //     res.status(201).json(newReminder)
    //     res.redirect('/users/profile');
    // } catch (err) {
    //     res.status(400).json({ message: err.message })
    // }
});


module.exports = app;