const express = require('express');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const pass_port = require('./utility/pass_port');
const multer = require('multer');
const upload = multer({dest: 'public/uploads/'});
const database_access = require('./utility/database_access');

const app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false},
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/modules', express.static('node_modules'));

app.post('/comment',(req,res,next)=>{
    console.log(req);
    const data = [
        req.user[0].username,
        req.user[0].id,
        req.body.id,
        req.body.message,
    ];
    database_access.addComment(data)
});
app.post('/comments',(req,res) =>{
    database_access.getComments(req.body.id,res);
});

app.post('/image', pass_port.isLogged, upload.single('my-image'),
    (req, res, next) => {
        next();
    });

app.use('/image', (req, res, next) => {
    const data = [
        0,
        req.user[0].id,
        req.user[0].username,
        req.body.title,
        'uploads/' + req.file.filename,
    ];
    database_access.insertImg(data, res);
});

app.post('/video', pass_port.isLogged, upload.single('my-video'),
    (req, res, next) => {
        next();
    });
app.use('/video', (req, res, next) => {
    const data = [
        1,
        req.user[0].id,
        req.user[0].username,
        req.body.title,
        'uploads/' + req.file.filename,
    ];
    database_access.insertVideo(data, res);
});
app.post('/profilePic', pass_port.isLogged, upload.single('profile-image'),
    (req, res, next) => {
        next();
    });

app.use('/profilePic', (req, res, next) => {
    const data = [
        0,
        req.user[0].id,
        req.user[0].username,
        'Profile Picture',
        'uploads/' + req.file.filename,
        1,
    ];
    database_access.insertUserImg(data, res);
});


app.get('/all',(req, res)=>{
    database_access.getMedia(res);
});

app.post('/register', pass_port.register, pass_port.log);

app.post('/login', pass_port.log);



app.listen(3000);