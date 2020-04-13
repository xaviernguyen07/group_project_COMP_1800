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
const darkSky = require("./darkSkyService");


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

// set the default link ot the public folder 
app.get('/', function(req, res) {
    res.render(__dirname + '/public');
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

// dSet the default path for usersRouter, reminderRouter
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/profile', reminderRouter);

// This will be used for umbrella button
app.use('/darkSky', async(req, res) => {

    const lat = req.query.lat;
    const lon = req.query.long;
    let darkSkyResults = await darkSky(lat, lon);
    let dailyRainProb = [];

    for (let i = 0; i < 8; i++) {
        dailyRainProb[i] = darkSkyResults.daily.data[i].precipProbability;
    }
    res.send(dailyRainProb)
});


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

module.exports = app;