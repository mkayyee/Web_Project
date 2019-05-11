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

const insertUserImg = (data, res) => {
    database.connect().execute(
        'INSERT INTO Media (i_or_v, uploader_ID, username, title, link, user_pic) VALUES (?,?,?,?,?,?);',
        data,
        (err, results,) => {
            if (err === null) {
                changeUserImg(data[1], data[4]);
                res.send(results);
            } else {
                console.log(err);
            }
        },
    );
};
const changeUserImg = (id, link) => {
    // Date conversion into sql date
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    database.connect().execute(
        `select * from Media where uploader_ID =${id} and VET IS NULL and user_pic = 1`,
        null, (err, results) => {
            if (err === null) {
                if (results.length > 1) {
                    console.log(results[0].ID);
                    database.connect().execute(
                        `update Media set VET="${date}" where ID =${results[0].ID};`,
                        null,(err,res)=>{
                            if(err === null){
                                database.connect().execute(`update Users set profile_pic="${link}" where ID=${id};`,
                                    null,(err,res)=>{});
                            }
                        }
                    )
                }
            }
        }
    )
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
        } else {
            cb(err)
        }
    })
};

// query that returns all media inside the global feed - with the uploader's profile pic.
const getMedia = (cb) => {
    database.connect().query(`select distinct Media.*, Users.profile_pic from Media inner join Users where Media.vet is null and user_pic=0 and Media.uploader_ID = Users.ID group by ID;`,
        null, (err, results) => {
            if (err === null) {
                cb.send(results);

            } else {
                console.log(err)
            }
        });

};
// returns all messages - that haven't been removed - inside a post
const getComments = (id, cb) => {
    database.connect().query(`select * from Messages where vet IS NULL and media_ID=${id}; `,
        null, (err, results) => {
            if (err === null) {
                cb.send(results);
            } else {
                console.log(err)
            }
        });
};

const addComment = (data) => {
    console.log(data);
    database.connect().execute(
        'INSERT INTO Messages (sender,sender_ID,media_ID,content) VALUES (?,?,?,?);',
        data,
        (err, results,) => {
            if (err === null) {
                console.log('success!');
            }
        },
    );
};


module.exports = {
    registerUser: registerUser,
    findByUser: findByUser,
    insertImg: insertImg,
    insertVideo: insertVideo,
    getAge: getAge,
    getMedia: getMedia,
    addComment: addComment,
    getComments: getComments,
    insertUserImg: insertUserImg,
};