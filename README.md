# Remind.Me

#### *A reminders app that allows users to add, edit, & delete reminders by after the users sign up and log into the app*

[Powered by Dark Sky](https://darksky.net/poweredby/)  
[Skycons](https://darkskyapp.github.io/skycons/)  
[Pickadate by The University of Mississippi](https://common.olemiss.edu/pickadate.html)  

### About the App

This Reminder App allows users to set up text reminders for things that matter. It is designed for individuals who have a busy schedule and want to add and additional layer of accountability to their lives.
Text messages have a 98% open rate, while email has only a 20% open rate. We are leveraging this to help people stay on top of their schedules.

### Motivation

We wanted to allow people to create reminders while also checking what they can do at what time and where using the app's integrated Geolocator and Weather APIs which can affect the descision of making plans. It will allow users to be aware of what times they can make the right plans accordingly to the outside weather while also having access to a smart and responsive reminder app that allows you to prioritize your schedules accordingly.

### Requirements
1.	The App must:
a) Create a reminder
b) Delete a reminder
c) Edit a reminder
2.	Associate Subtasks, tags and a date when the user should be reminded
3.	Persistence:
a) Create a backup of all the reminders (Export to file)
b) Import a backup of all the reminders
4.	User Authentication
5.	Use of DarkSky Weather API & HTML5 Geolocation API

### Set up
1. `$ cd ReminderApp`
2. `$ npm install requirements`
3. `$ echo "MONGOURI=<INSERT_MONGO_URI>" > .env`  *Replace <INSERT_MONGO_URI> with URI of your mongodb database.*
4. `npm start`

 

### Instructions

- When you arrive to the homepage, you sign up and sign in with a specific email and password
- On the bottom-left of the page you can create a new reminder
- Fill out the form with all relevant information, including tags, subtasks, time and date to be reminded
- All reminders will be added to the left side in the form of a scrolling page to keep track of the reminders with a check box next to them
- You can edit and delete reminders 


### Live Link `
```
[remind.me app](*********************/)
```

### Front End Tech
* HTML5
* CSS3
* ReactJS
* Bootstrap
* Javascript ES6

  

### Back End Tech
* Node.js
* Express.js, Express Router, Middlewares
* MongoDB, Mongoose
* Node Rest Client
* NPM Packages
  * [bcrypt](https://www.npmjs.com/package/bcrypt) -> Used for cryptographic hashing of passwords.
  * [mongo](https://www.npmjs.com/package/mongo) -> Database for storing persistent info.
  * [mongoose](https://www.npmjs.com/package/mongoose) -> Used to create Schemas for DataBase storage.
  * [express](https://www.npmjs.com/package/express) -> Server and templating
  * [morgan](https://www.npmjs.com/package/morgran) -> Logging
  * [dotenv](https://www.npmjs.com/package/dotenv) -> Used for hiding secrets.
  * [ejs](https://www.npmjs.com/package/ejs) -> Templating


### APIs Used
* DarkSky Weather API
* HTML5 Geolocation API


### To be completed
* Search bar functionality
* Forgot password
* Search and add friends
* Share reminders
* Option for users to delete account
* Back up, export and import reminders


### Project Contributors
* Zenen Hornstein - [ZenenHornstein](https://github.com/ZenenHornstein)
* Tommy Chien - [Tommy-81321](https://github.com/Tommy-81321)
* Terry Weilun - [TerryLun](https://github.com/TerryLun)
* Sepehr Mansouri - [sepehrman](https://github.com/sepehrman)
* Xavier Nguyen - [xaviernguyen07](https://github.com/xaviernguyen07)
