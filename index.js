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
    secret: 'asd',
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


// commenting on a post -POST
app.post('/comment',(req,res,next)=>{
    const data = [
        req.user[0].username,
        req.user[0].id,
        req.body.id,
        req.body.message,
    ];
    database_access.addComment(data,res)
});

// retrieving comments for posts
app.post('/comments',(req,res) =>{
    database_access.getComments(req.body.id,res);
});

// private message -POST
app.post('/pmsg', (req,res) => {
    const data = [
        req.user[0].username,
        req.user[0].id,
        req.body.user_id,
        req.body.message,
    ];
    database_access.sendPM(data, res)
});

app.delete('/del/:ID', (req, res) => {
    const data = [
        req.params.ID,
        req.user[0].id,
    ];
    database_access.del(data, res);
});

app.post('/image', pass_port.isLogged, upload.single('my-image'),
    (req, res, next) => {
        next();
    });

app.use('/image', (req, res) => {
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

// start page
app.get('/index',(req, res)=>{
    console.log(req.session.passport);
    if(req.user !== undefined){
        /* if user object exists -> response consists of not only of the post data,
          but also the user object and session to keep track of logged in users */
        database_access.getMedia(res,req.session,req.user);
    }
    else { // req.session is undefined here, so main.js knows that no user is logged in
        database_access.getMedia(res, req.session, null);
    }
});

app.post('/users/',(req, res)=>{
    console.log(req.body);
    let id = req.body.userid;
    database_access.getWithID(id,res);

});

app.post('/register', pass_port.register, pass_port.log);


app.post('/login', pass_port.log);


app.post('/logout', (req, res)=>{
    req.session.destroy((err) =>{
        res.redirect('/');
    });
});



app.listen(3000);