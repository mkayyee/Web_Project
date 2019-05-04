'use strict';

const database = require('./database');

// couldn't figure out a way to combine registerUser with findByUser so here's a temporary solution
const checkUser = (data, next) => {
    database.connect().query(
        'SELECT * FROM Users WHERE username = ?;',
        data[2],
        (err, results) => {
            if (err == null) {
                if (results.length === 0) {
                    registerUser(data);
                }
                else{
                    console.log('Username taken!');
                }
            }
            else (console.log(err));
        },
    );
};

const registerUser = (data, next) => {
    database.connect().execute(
        //Implement database insert
        'INSERT INTO Users (firstname, lastname, username, password) VALUES (?, ?, ?, ?);',
        data,
        (err, results, fields) => {
            console.log(results);
            console.log(err);
        },
    )
};

const findByUser = (username, cb) => {
    database.connect().execute(
        'SELECT * FROM Users WHERE username = ?;',
        username,
        (err, results, fields) => {
            console.log('results', results);
            console.log(err);
            cb();
        },
    );
};

module.exports = {
    registerUser: registerUser,
    findByUser: findByUser,
    checkUser: checkUser
};