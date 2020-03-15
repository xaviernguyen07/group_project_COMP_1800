let Database = require("../database");

let remindersController = {
    main_page: (req, res) => {
        res.render('reminder/main_page', { reminders: Database.cindy.reminders })
    },
    new: (req, res) => {
        res.render('reminder/main_page')
    },

    // listOne: (req, res) => {
    //     let reminderToFind = req.params.id;
    //     let searchResult = Database.cindy.reminders.find(function(reminder) {
    //         return reminder.id == reminderToFind; // good test question for students what happens if I put ===
    //     })
    //     if (searchResult != undefined) {
    //         res.render('reminder/single-reminder', { reminderItem: searchResult })
    //     } else {
    //         res.render('reminder/index', { reminders: Database.cindy.reminders })
    //     }
    // },
    create: (req, res) => {
        // let reminder = {
        //     id: Database.cindy.reminders.length + 1,
        //     title: req.body.title,
        //     description: req.body.description, // figure out how to get title and descrption
        //     completed: false
        // }
        let reminder = {
            id: Database.cindy.reminders.length + 1,
            title: req.body.title,
            date: req.body.date, // figure out how to get title and descrption
            time: req.body.time,
            subtask: req.body.subtask
        }


        Database.cindy.reminders.push(reminder);
        res.redirect('/reminder');
    },
    // edit: (req, res) => {
    //     let reminderToFind = req.params.id;
    //     let searchResult = Database.cindy.reminders.find(function(reminder) {
    //         return reminder.id == reminderToFind; // Why do you think I chose NOT to use === here?
    //     })
    //     res.render('reminder/edit', { reminderItem: searchResult })

    // }
}

module.exports = remindersController;