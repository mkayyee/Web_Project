const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const databaseAccess = require('./database_access');

//Implement strategy for passport
passport.use(new Strategy(
    (username, password, cb) => {
      databaseAccess.findByUser(username, (err, user) => {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        bcrypt.compare(password, user.password, (err, res) => {
          if(res) {
            return cb(null, user);
          }
          else {
            return cb(null, false);
          }
        });
        return cb(null, user);
      });
    }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

const register = (req, res, next) => {
  const saltRounds = 12;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    databaseAccess.checkUser([req.body.firstname, req.body.lastname, req.body.username, hash] ,next);
  });
};

module.exports = {
  register: register
};