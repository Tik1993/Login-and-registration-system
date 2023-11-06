const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose.connect(database)
.then(() => console.log('e don connect'))
.catch(err => console.log(err));

//To check the default settings
// console.log(app.get('views'))
// console.log(app.get('view engine'))
app.set('view engine','ejs')

//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/',require('./routes/login'))

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening in port ${port}`))
