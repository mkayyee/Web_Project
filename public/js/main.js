'use strict';

let originalData = null;
let isLogged = false;
let userData = null;

const regButton = document.querySelector('#reg-button');
const uploadDrop = document.querySelector('.upload-dropdown');
const regForm = document.querySelector('#register-form');
const regClose = document.querySelector('#register-close');
const loginButton = document.querySelector('#login-button');
const loginClose = document.querySelector('#login-close');
const loginForm = document.querySelector('#login-form');
const logOutBtn = document.querySelector("#logout");
const showUsername = document.querySelector('#user');
const profileDrop = document.querySelector('#profile-dropdown');
const profileMenu = document.querySelector('#profile-menu');
const profileClose = document.querySelector('#close-profile');
const picProfile = document.querySelector('#profile-pic');
const closeForms = document.querySelector('.close-forms');
const uploadDiv = document.querySelector('.upload-div');
const changePicButton = document.querySelector('#change-profile-pic');
const picFormVisible = document.querySelector('#profile-pic-form-visible');
const closeProfilePic = document.querySelector('#profile-pic-close');
let profilePic = document.querySelector('.profile-pic');
let menuProfilePic = document.querySelector('#profile-pic');
const uploadPic = document.querySelector('#upload-pic');
const uploadVid = document.querySelector('#upload-vid');
const uploadPicForm = document.querySelector('#upload-form');
const uploadVidForm = document.querySelector('#upload-video');



// Change profile pic
const profileImgForm = document.querySelector('#profile-pic-form');
const profileImageSend = (evt) => {
    evt.preventDefault();
    const fd = new FormData(profileImgForm);
    const settings = {
        method: 'post',
        body: fd,
    };
    fetch('./profilePic', settings).then((response) => {
        return response.json();
    }).then((json) => {
        picFormVisible.style.visibility = 'hidden';
        profileImgForm.reset();
        getData();
    });

};
profileImgForm.addEventListener('submit', profileImageSend);


// UPLOADING MEDIA

// Upload Image
const imgForm = document.querySelector('#upload-form');
const sendImageForm = (evt) => {
    evt.preventDefault();
    const fd = new FormData(imgForm);
    const settings = {
        method: 'post',
        body: fd,
    };

    fetch('./image', settings).then((response) => {
        return response.json();
    }).then((json) => {
        uploadDiv.style.display = 'none';
        imgForm.reset();
        getData();
    });

};
imgForm.addEventListener('submit', sendImageForm);

// Upload Video
const vidForm = document.querySelector('#upload-video');

const sendVideoForm = (evt) => {
    evt.preventDefault();
    const fd = new FormData(vidForm);
    const settings = {
        method: 'post',
        body: fd,
    };

    fetch('./video', settings).then((response) => {
        return response.json();
    }).then((json) => {
        uploadDiv.style.display = 'none';
        vidForm.reset();
        getData();
    });

};
vidForm.addEventListener('submit', sendVideoForm);


// DELETING MEDIA
const deleteMedia = (id) => {
    const settings = {
        method: 'DELETE',
    };
    fetch('./del/' + id, settings).then(response => {
        return(response);
    }).then(json => {
        getData();
    });
};

// Clicking on a user fetches their data from the db
const userInfo = (id,feedID) =>{
    const userid = JSON.stringify({
        userid: id,
    });
    const settings = {
        method: 'POST',
        body: userid,
        headers: { 'Content-Type': 'application/json' },
    };
    fetch('./users/', settings).then(response =>{
        return response.json();
    }).then((json)=>{
        loadUserWindow(json,feedID);
    })
};
// Opens a window that contains user information, where you can send a private message to them
const loadUserWindow = (data, id)=>{
    let display = 'none';
    if (isLogged){
        display = 'block';
    }
    if(document.querySelector(`#feed-id${id}`).querySelector('.user-window').style.visibility === 'hidden'){
        document.querySelector(`#feed-id${id}`).querySelector('.user-window').style.visibility = 'visible';
    }
    else{
        document.querySelector(`#feed-id${id}`).querySelector('.user-window').style.visibility = 'hidden';
    }
    document.querySelector(`#feed-id${id}`).querySelector('.user-window').innerHTML = `<button>${data[0].username}</button><ul><li>${data[0].firstname + " " + data[0].lastname}</li><li>${data[0].location}</li><li>Age: ${data[1].age}</li><button style="display: ${display}" class="send-pm" onclick="openPMForm('${data[0].username}',${data[0].id})">Send PM</button><button style="width: 100%" onclick="hideUserWindow(${id})">Close</button></ul>`;
};



// closer for the user window
const hideUserWindow=(feed)=>{
  let userWindow = document.querySelector(`#feed-id${feed}`).querySelector('.user-window');
  userWindow.style.visibility = 'hidden';

};
// add receivers name and ID on the PM form
const pmForm = document.querySelector('.pm-form');
pmForm.style.visibility = 'visible';
const openPMForm = (name,id) =>{
    pmForm.style.display = 'block';
    document.querySelector('.receiver').innerHTML = name;
    document.querySelector('#user_id').value = id;
};
const pmClose = ()=>{
  pmForm.style.display = 'none';
};


// form for sending a private message
const privateMsg = (evt) => {
    evt.preventDefault();
    let id = document.forms['pm-form']['user_id'].value;
    let content = document.forms['pm-form']['message'].value;
    const data = JSON.stringify({
        user_id: id,
        message: content,
    });
    const settings = {
        method: 'post',
        body: data,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    };
    fetch('./pmsg', settings).then((response) => {
        pmForm.reset();
        return response.json();
    }).then((json) => {
        pmForm.style.visibility = 'hidden';
        window.alert('Message sent!');

    });

};

// CREATING GLOBAL FEED ARTICLES

// creates all articles with appropriate data fetched from the database
const articleContent = (user, date, media, title, format, id, profile_pic,uploaderID) => {

    let deleteButton = `hidden`;
    /* checks for a moderator status or if logged in users own post
      if either == true -> makes the delete button visible */
    if (userData !== null){
        if (userData.id === uploaderID || userData.user_status === 1){
            deleteButton = 'visible';
        }
    }

        // if image -> creates an HTML with an <img> tag
    if (format === 0) {
        return `
<article class="feed-box" id="feed-id${id}"><div id="feed-bar"><div class="user-info" onclick="userInfo(${uploaderID},${id})"><img src=${profile_pic}><p class="feed-user">${user}<p></div><div class="user-window" style="visibility: hidden"></div><div id="feed-right"><button class="delete-button" onclick="deleteMedia(${id})" style="visibility: ${deleteButton}">Delete</button></div></div><p class="feed-date">${date}</p><header>${title}</header><img src="${media}" ><div class="comment-div"><button class="show-comments"></button><comment class="pic-comment"></comment></div><div class="c-form-send"><form class="comment-form" style="display: none;"name="comment-form" ><input type="textarea" name="message" class="comment-text"><input class="id" type="hidden" name="id" value="${id}"><button type="submit" class="comment-send">Comment</button></form></div></article>`;

        // if video -> creates an HTML with a <video> tag
    } else {
        return `
<article class="feed-box" id="feed-id${id}"><div id="feed-bar"><div class="user-info" onclick="userInfo(${uploaderID},${id})"><img src=${profile_pic}><p class="feed-user">${user}<p></div><div class="user-window" style="visibility: hidden"></div><div id="feed-right"><button class="delete-button" onclick="deleteMedia(${id})" style="visibility: ${deleteButton}">Delete</button></div></div><p class="feed-date">${date}</p><header>${title}</header><video src="${media}" width="75%" onclick="this.play()" controls="controls" ></video><div class="comment-div"><button class="show-comments"></button><comment class="pic-comment"></comment></div><div class="c-form-send"><form class="comment-form" style="display: none;"name="comment-form"><input type="textarea" name="message" class="comment-text" ><input class="id" type="hidden" name="id" id="id" value="${id}"><button type="submit" class="comment-send">Comment</button></form></div></article>`;
    }
};
// getData() is called on index page load and after every change, to fetch data from the database
const getData = () => {
    let url = './index';
    fetch(url).then(response => {
        return response.json();
    }).then(items => {
        // db data
        originalData = items[1];
        // checking the response for session
        if(items[0].passport !== undefined){
            isLogged = true;
        }
        // if there is a req.user -> "items[2] is the user data, null otherwise"
        if(items[2] !== null){
            userData = items[2][0];
        }

    }).then(()=>{
        updateView(originalData);
    });
};
const updateView = (stuff) => {
    // items in reversed order to start from the latest
    let items = stuff.reverse();
    for (let item of items) {
        // parses the post's date into a more readable format
        let date = `${items[0].vst.substring(0, 10)} at ${items[0].vst.substring(12, 19)}`;

        // checks if the uploader has a profile pic
        if (item.profile_pic === null) {
            // if null -> some random pic
            profilePic = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Blue_Question.svg/128px-Blue_Question.svg.png";
        }
        else {
            profilePic = items[0].profile_pic;
        }
        // calls createArticle to add html content to the article
        const article = document.createElement('article');
        article.innerHTML = articleContent(item.username, date, item.link, item.title, item.i_or_v, item.ID, profilePic, item.uploader_ID);

        // adds article to view
        document.querySelector('#global-feed').appendChild(article);

        // creates some html content for comments
        const commentWindow = document.createElement("div");
        const comments = article.querySelector('.pic-comment');
        const showCommentButton = article.querySelector('.show-comments');
        const sendMessage = article.querySelector('.comment-form');

        // an event listener for commenting on a post
        sendMessage.addEventListener('submit', () => {
            event.preventDefault();
            let media_id = sendMessage.querySelector('.id').value;
            let message_content = sendMessage.querySelector('.comment-text').value;
            const data = JSON.stringify({
                id: media_id,
                message: message_content,
            });
            const settings = {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            };
            sendMessage.reset();
            fetch('./comment', settings)
                .then((response) => {
                    originalData = null;
                    return response.json();
                }).then(()=>{
                    getData();
            });
        });

        // fetches all comments for their appropriate messages by message ID
        getComments(item.ID, (results) => {
            console.log(results);

            let text = '';
            let count = 0;  // comment count for each post. Will be added to 'show comments button'
            for (let res in results) {
                text += `<div class="comment-box"><p><span class="sender">${results[res].sender}</span><span class="comment">${results[res].content}</span></div>`;
                count++
            }
            commentWindow.innerHTML += text;
            comments.appendChild(commentWindow);

            // the settings for displaying comments
            if(count>0) {
                showCommentButton.textContent = `Show Comments(${count})`;
            }
            else{
                showCommentButton.textContent = 'No comments';
                showCommentButton.disabled = true;
            }

            showCommentButton.addEventListener('click', () => {
                if (comments.style.display === 'none') {
                    comments.style.display = '';
                    if(count>0) {
                        showCommentButton.textContent = 'Hide Comments'
                    }
                    else{
                        showCommentButton.textContent = 'No comments';
                        showCommentButton.disabled = true;
                    }

                } else {
                    comments.style.display = 'none';
                    showCommentButton.textContent = `Show Comments(${count})`;
                }
            });
        });
        comments.style.display = 'none';
        commentWindow.className = 'comment-window';
    }
    if (isLogged){
        // checks if the current user has a profile pic
        if (userData.profile_pic !== null) {
            menuProfilePic.src = userData.profile_pic;
        }
        else{
            menuProfilePic.src = "https://img.icons8.com/dotty/2x/user.png"
        }
        // if a user has logged in -> hides the UI for an un-logged user and brings new UI elements
        hideLogReg();

    }
};
const getComments = (medID, respond) => {
    const data = JSON.stringify({
        id: medID,
    });
    const settings = {
        method: 'post',
        body: data,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    };
    fetch('./comments', settings).then((response) => {
        return response.json();
    }).then((json) => {
        respond(json);
    });

};
// if user authenticated -> this will be loaded every time the page is loaded
const hideLogReg = () => {
    const commentForm = document.querySelectorAll('.comment-form');
    regButton.style.display = 'none';
    loginButton.style.display = "none";
    loginForm.style.display = 'none';
    regForm.style.display = 'none';
    showUsername.textContent = userData.username;
    showUsername.style.visibility = 'visible';
    picProfile.style.visibility = 'visible';
    profileDrop.style.visibility = 'visible';
    uploadDrop.style.display ='block';
    for (let forms in commentForm){
        if(commentForm[forms].style !== undefined) {
            commentForm[forms].style.display = 'inline';
            commentForm[forms].style.height = '30px'
        }
    }
};
// LOGOUT
const logOut = () => {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    };
    fetch('./logout', settings)
        .then(() => {
        }).then(() =>{
        isLogged = false;
        userData = null;
        document.location.reload();
    })
};
logOutBtn.addEventListener('click', logOut);


getData();