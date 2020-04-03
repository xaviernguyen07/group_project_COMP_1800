const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    title: String,
    date: String,
    time: String,
    subtask: String,
    tags: []
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;