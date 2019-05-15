'use strict';
const database = require('./database');


const registerUser = (data, next) => {
    database.connect().execute(
        'INSERT INTO Users (firstname, lastname, username, password, location, birthday) VALUES (?, ?, ?, ?, ?, ?);',
        data,
        (err) => {
            if (err === null) {
                next();
            }
        },
    )
};
// select all by username
const findByUser = (username, cb) => {
    database.connect().query(
        'SELECT * FROM Users WHERE username = ?;',
        username,
        (err, results) => {
            if (results !== undefined) {
                if (results.length > 0) {
                    cb(err, results)
                } else {
                    cb(`User ${username} not found`, []);
                }
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
// next 2 functions for changing profile pic

const insertUserImg = (data, res) => {
    database.connect().execute(
        'INSERT INTO Media (i_or_v, uploader_ID, username, title, link, user_pic) VALUES (?,?,?,?,?,?);',
        data,
        (err, results,) => {
            if (err === null) {
                changeUserImg(data[1], data[4],(cb)=>{
                    // waiting for the callback so the view can load new data
                    res.send(cb);
                });
            } else {
                console.log(err);
            }
        },
    );
};
const changeUserImg = (id, link,res) => {
    // Date conversion into sql date
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    database.connect().execute(
        // first checking if a user already has a profile pic. If so -> set's it's valid end time ...
        `select * from Media where uploader_ID =${id} and VET IS NULL and user_pic = 1`,
        null, (err, results) => {
            if (err === null) {
                if (results.length > 1) {
                    database.connect().execute(
                        // ... here
                        `update Media set VET="${date}" where ID =${results[0].ID};`,
                        null, (err, result) => {
                            if (err === null) {
                                // finally setting the profile pic
                                database.connect().execute(`update Users set profile_pic="${link}" where ID=${id};`,
                                    null, (err, result) => {
                                    res(result)
                                    });
                            }
                        }
                    )
                } else {
                    database.connect().execute(`update Users set profile_pic="${link}" where ID=${id};`,
                        null, (err, result) => {
                            res(result)
                        });


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
const getMedia = (cb, session, user) => {
    database.connect().query(`select distinct Media.*, Users.profile_pic from Media inner join Users where Media.vet is null and user_pic=0 and Media.uploader_ID = Users.ID group by ID;`,
        null, (err, results) => {
            if (err === null) {
                let resultAndSession = [session];
                resultAndSession.push(results);
                resultAndSession.push(user);
                cb.send(resultAndSession);

            } else {
                console.log(err)
            }
        });
};
// select a user by user ID
const getWithID = (id, cb) => {
    database.connect().query(`select * from Users where id=${id};`,
        null, (err, results) => {
            if (err === null) {
                const userData = [results];
                // finds users age and adds it to the response object
                getAge(results[0].username, (age) => {
                    userData[0].push({age: age});
                    cb.send(userData[0]);
                })

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
// add a comment (on a post) to the database
const addComment = (data, res) => {
    console.log(data);
    database.connect().execute(
        'INSERT INTO Messages (sender,sender_ID,media_ID,content) VALUES (?,?,?,?);',
        data,
        (err, results,) => {
            if (err === null) {
                console.log('success!');
                res.send(results);
            }
        },
    );
};
// private message insertion into the database
const sendPM = (data, res) => {
    console.log(data);
    database.connect().execute(
        'INSERT INTO Messages (sender,sender_ID,receiver_ID,content) VALUES (?,?,?,?);',
        data,
        (err, results,) => {
            if (err === null) {
                console.log('success!');
                res.send(results);
            }
        },
    );
};
// for deleting media
const del = (data, res) => {
    // date for valid end time
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    database.connect().execute(
        // post's can't be deleted before all messages are deleted (FK constraint)
        `update Messages set vet="${date}" where media_ID=${data[0]};`,
        null,
        (err) => {
            if (err === null) {
                database.connect().execute(
                    // setting valid end date to the post
                    `update Media set vet="${date}" WHERE ID = ? AND uploader_ID = ?;`,
                    data,
                    (error, result) => {
                        if (error === null) {
                            res.send(result);
                        }
                    }
                )
            } else {
                res.send(err);
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
    del: del,
    getWithID: getWithID,
    sendPM: sendPM,
};