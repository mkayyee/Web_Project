const express = require('express');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const pass_port = require('./utility/pass_port');
const multer = require('multer');
const upload = multer({dest: 'public/uploads/'});
const database_access = require('./utility/database_access');
let userID = '';

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

app.post('/image', pass_port.isLogged, upload.single('my-image'),
    (req, res, next) => {
        next();
    });
app.use('/image', (req, res, next) => {
    // lisää kuvan tiedot tietokantaan
    console.log(req);
    console.log('user id ========= ' + req.user.id);
    const data = [
        //req.user.id, <---- need to get this to work
        req.body.title,
        'uploads/' + req.file.filename,
        // from passport (database column is uID)
    ];
    database_access.insert(data, res);
});

app.post('/register', pass_port.register, pass_port.log);

app.post('/login', pass_port.log);

app.listen(3000);