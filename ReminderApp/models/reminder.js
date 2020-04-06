const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    username: String,
    title: String,
    description: String,
    datetime: Date,
    subtask: [],
    tags: []
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;