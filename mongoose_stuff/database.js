const mongoose = require("mongoose");

//User Schema
let UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },

  passWord: {
    type: String,
    required: true
  },

  reminders: [ReminderOBJs],

  friendList: [UserObjects]
});
