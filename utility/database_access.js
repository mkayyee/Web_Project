'use strict';
const database = require('./database');

const registerUser = (data, next) => {
    database.connect().execute(
        //Implement database insert
        'INSERT INTO Users (firstname, lastname, username, password) VALUES (?, ?, ?, ?);',
        data,
        (err, results, fields) => {
            if (err === null){
                next();
            }
        },
    )
};
const findByUser = (username, cb) => {
    database.connect().query(
        'SELECT * FROM Users WHERE username = ?;',
        username,
        (err, results, fields) => {
            //console.log('results', results);
            //console.log(err);
          cb(err, results);
        },
    );
};

module.exports = {
    registerUser: registerUser,
    findByUser: findByUser,
};