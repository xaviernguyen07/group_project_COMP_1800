let Database = require("../database");

let remindersController = {
    list: (req, res) => {
        res.render('reminder/main_page', { reminders: Database.cindy.reminders, })
    },

    new: (req, res) => {
        res.render('reminder/main_page')
    },

    // list_tag: (req, res) => {
    //     res.render('reminder/subpage', { reminders: Database.cindy.reminders })
    // },

    new_tag: (req, res) => {
        res.render('reminder/subpage')
    },

    // link: (req, res) => {

    //     res.render('reminder/main_page', { reminders: Database.cindy.reminders, id = Database.cindy.reminders  })
    // },    

    // list1: (req, res) => {
    //     res.render('/reminder/reminder_subpage', { reminderItem: Database.cindy.reminders })
    // },

    listOne: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = Database.cindy.reminders.find(function(reminder) {
            return reminder.id == reminderToFind; // good test question for students what happens if I put ===
        })
        if (searchResult != undefined) {
            res.render('reminder/subpage', { reminderItem: searchResult })
        } else {
            res.render('reminder/empty_page', { reminders: Database.cindy.reminders })
        }
    },

    create: (req, res) => {
        let reminder = {
            id: Database.cindy.reminders.length + 1,
            title: req.body.title,
            date: req.body.date, // figure out how to get title and descrption
            time: req.body.time,
            subtask: req.body.subtask,
            tag: []
        }
        Database.cindy.reminders.push(reminder);
        res.redirect('/reminder');
    },

    edit: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = Database.cindy.reminders.find(function(reminder) {
            return reminder.id == reminderToFind; // Why do you think I chose NOT to use === here?
        })
        res.render('reminder/subpage', { reminderItem: searchResult })

    },

    // create_tag: (req, res) => {
    //     let tag = {
    //         tag: req.body.tag
    //     }
    //     Database.cindy.reminders.push(tag);
    //     res.redirect('/reminder/2');

    // },


    edit_tag: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = Database.cindy.reminders.find(function(reminder) {
            return reminder.id == reminderToFind; // Why do you think I chose NOT to use === here?
        })
        if (searchResult != undefined) {
            res.render('reminder/subpage', { reminderItem: searchResult })
        } else {
            res.render('reminder/empty_page', { reminders: Database.cindy.reminders })
        }
    },

    update_tag: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = Database.cindy.reminders.find(function(reminder) {
            if (reminder.id == reminderToFind) {
                let new_tag = req.body.tag
                reminder.tag.push(new_tag)
            }
        });
        res.redirect('/reminder/' + reminderToFind)
    },

    delete: (req, res) => {
        let reminderToFind = req.params.id;
        let reminderIndex = Database.cindy.reminders.findIndex(function(reminder) {
            return reminder.id == reminderToFind;
        })
        Database.cindy.reminders.splice(reminderIndex, 1);
        res.redirect('/empty_page');
        res.redirect('/reminder');
    }
}

module.exports = remindersController;