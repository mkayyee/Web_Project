const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const databaseAccess = require('./database_access');
const loginJS = require('../public/js/login');

//Implement strategy for passport
passport.use(new Strategy(
    (req, res, cb) => {
      databaseAccess.findByUser(req, (err, user) => {
        //console.log(err);
        //console.log(user);
        if (err) {
          //console.log('11 err = ' + err);
          return cb(err); }
        if (user.length < 1) {
          //console.log('22');
          return cb(null, false); }
        //console.log(res + ' ' + user[0].password);
        bcrypt.compare(res, user[0].password, (err, res) => {
          //console.log('res = ' + res);
          //console.log('err = '+ err);
          if(res) {
            //console.log('1');
            return cb(null, user[0]);
          }
          else {
            //console.log("2");
            return cb(null, false);
          }
        });
      });
    }
));

//From example "https://github.com/ilkkamtk/express-mysql-example/blob/master/utils/pass.js", to get return object to login fetch
const log = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {return next(err);}
    if (!user) { return res.sendStatus(403);}
    req.logIn(user, (err) => {
      if (err) {return next(err);}
      return res.send(req.user);
    });
  })(req, res, next);
};

passport.serializeUser((user, cb) => {
  cb(null, user.username);
});

passport.deserializeUser((username, cb) => {
  databaseAccess.findByUser(username, (err, user) => {
    if(err) {
      return cb(err);
    }
    cb(null, user);
  });
});

const register = (req, res, next) => {
  const saltRounds = 12;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    //console.log(hash);
    databaseAccess.findByUser(req.body.username, (err,res)=>{
      if (res.length > 0){
        // haven't figured out yet how to turn this into an alert...
        console.log('Username taken')
      }
      else{
        databaseAccess.registerUser([req.body.firstname, req.body.lastname, req.body.username, hash,req.body.location,req.body.birthday] ,next);
      }
    });
  });
};

const isLogged = (req, res, next) => {
  if(req.user) {
    next();
  }
  else {
    console.log(req.user);
    console.log("Not logged");
  }
};

module.exports = {
  register: register,
  isLogged: isLogged,
  log: log
};