'use strict';
const database = require('./database');

const registerUser = (data, next) => {
    database.connect().execute(
        //Implement database insert
        'INSERT INTO Users (firstname, lastname, username, password, location, birthday) VALUES (?, ?, ?, ?, ?, ?);',
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
const insert = (data, res) => {
    database.connect().execute(
        // 'INSERT INTO Media (uploader_ID, title, link) VALUES (?,?,?);', <--- when req.user.id works
        'INSERT INTO Media (title, link) VALUES (?,?);',
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