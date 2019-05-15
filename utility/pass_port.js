const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const databaseAccess = require('./database_access');

//Implement strategy for passport
passport.use(new Strategy(
    (req, res, cb) => {
      databaseAccess.findByUser(req, (err, user) => {
        if (err) {
          return cb(err); }
        if (user.length < 1) {
          return cb(null, false); }
        bcrypt.compare(res, user[0].password, (err, res) => {
          if(res) {
            delete user[0].password;
            return cb(null, user[0]);
          }
          else {
            return cb(null, false);
          }
        });
      });
    }
));

const log = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
        return next(err);
    }
    if (!user) {
        return res.sendStatus(403);
    }
    req.logIn(user, (err) => {
      if (err) {
          return next(err);
      }
      databaseAccess.getAge(user.username, (age) =>{
        //console.log(age)
      });
      console.log(`User ${user.username} has logged in`);
      return res.send(req.user);
    });
  })(req, res, next);
};

passport.serializeUser((user, cb) => {
  cb(null, user.username);
});

passport.deserializeUser((user, cb) => {
  databaseAccess.findByUser(user, (err, user) => {
    cb(err, user);
  });
});

const register = (req, res, next) => {
  const saltRounds = 12;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
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
  if(req.isAuthenticated()) {
    next();
  }
  else {
    res.sendStatus(403);
  }
};
const logOut = ()=>{};

module.exports = {
  register: register,
  isLogged: isLogged,
  log: log,
  logOut: logOut,
};