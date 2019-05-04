const express = require('express');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const pass_port = require('./utility/pass_port');

const app = express();
app.use(session({
  secret: 'random sentence as secret',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false},
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/modules', express.static('node_modules'));

app.post('/register', pass_port.register);

app.post('/login', pass_port.log);
app.listen(3000);