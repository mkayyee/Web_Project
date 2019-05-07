'use strict';
const database = require('./database');

const registerUser = (data, next) => {
    database.connect().execute(
        //Implement database insert
        'INSERT INTO Users (firstname, lastname, username, password, location, birthday) VALUES (?, ?, ?, ?, ?, ?);',
        data,
        (err, results, fields) => {
            if (err === null) {
                next();
            }
        },
    )
};
const findByUser = (username, cb) => {
    database.connect().query(
        'SELECT * FROM Users WHERE username = ?;',
        username,
        (err, results) => {
            if (results.length > 0) {
                cb(err, results)
            } else {
                cb(`User ${username} not found`, []);
            }
        },
    );
};
const insert = (data, res) => {
    database.connect().execute(
        'INSERT INTO Media (uploader_ID, title, link) VALUES (?,?,?);',
        data,
        (err, results,) => {
            if (err == null) {
                res.send(results);
            } else {
                console.log(err);
            }
        },
    );
};

module.exports = {
    registerUser: registerUser,
    findByUser: findByUser,
    insert: insert,
};

const getAge = (username, cb) => {
    findByUser(username, (err, res) => {
        if (res.length > 0) {
            let date = new Date();
            let age = date.getFullYear() - res[0].birthday.getFullYear();
            let month = res[0].birthday.getMonth();
            let day = res[0].birthday.getDate();
            if (month > date.getMonth() + 1) {
                age -= 1;
            }
            if (month === date.getMonth() + 1) {
                if (day > date.getDate()) {
                    age -= 1;
                }
            }
            cb(age);
        }
        else {
            cb(err)
        }
    })
};


