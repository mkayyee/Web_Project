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
const insertImg = (data, res) => {
    database.connect().execute(
        'INSERT INTO Media (i_or_v, uploader_ID, username, title, link) VALUES (?,?,?,?,?);',
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
const insertVideo = (data, res) => {
    database.connect().execute(
        'INSERT INTO Media (i_or_v, uploader_ID, username, title, link) VALUES (?,?,?,?,?);',
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
const getMedia = (cb) =>{
    database.connect().query('select * from Media where VET IS NULL and user_pic=0;',
        null,(err,results)=>{
        if(err === null){
            cb.send(results);

        }
        else{console.log(err)}
        });

};
    //result.forEach(() =>{globalFeed.articleContent(result[0].ID,result[0].vst,result[0].link,result[0].title);






module.exports = {
    registerUser: registerUser,
    findByUser: findByUser,
    insertImg: insertImg,
    insertVideo: insertVideo,
    getAge: getAge,
    getMedia: getMedia,
};


