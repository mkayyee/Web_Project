'use strict';

let originalData = null;
let all = true;

const regButton = document.querySelector('#reg-button');
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


// brings out the form for changing profile pic
changePicButton.addEventListener('click', () => {
    profileMenu.style.visibility = 'hidden';
    picFormVisible.style.visibility = 'visible';
});
// closes the profile pic form
closeProfilePic.addEventListener('click', () => {
    picFormVisible.style.visibility = 'hidden'
});

// brings out the registration form
regButton.addEventListener("click", () => {
    if (loginForm.style.visibility === 'visible') {
        loginForm.style.visibility = 'hidden';
    }
    if (regForm.style.visibility === 'visible') {
        regForm.style.visibility = 'hidden';
    } else {
        regForm.style.visibility = 'visible'
    }
});

// closes the registration form
regClose.addEventListener("click", () => {
    regForm.style.visibility = 'hidden'
});

// brings out the login form
loginButton.addEventListener("click", () => {
    if (regForm.style.visibility === 'visible') {
        regForm.style.visibility = 'hidden';
    }
    if (loginForm.style.visibility === 'visible') {
        loginForm.style.visibility = 'hidden';
    } else {
        loginForm.style.visibility = 'visible'
    }
});

// closes the login form
loginClose.addEventListener("click", () => {
    loginForm.style.visibility = 'hidden'
});

const logOut = () => {

};
logOutBtn.addEventListener('click', logOut);


const profileImgForm = document.querySelector('#profile-pic-form');
// Change profile pic
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
        imgForm.reset();
        getData();
    });

};
imgForm.addEventListener('submit', sendImageForm);


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
        vidForm.reset();
        getData();
    });

};
vidForm.addEventListener('submit', sendVideoForm);

// clicking on profile at the top right corner brings out profile menu if not visible, hides if visible
profileDrop.addEventListener('click', () => {
    if (profileMenu.style.visibility === 'visible') {
        profileMenu.style.visibility = 'hidden';
    } else {
        profileMenu.style.visibility = 'visible';
    }
});
profileClose.addEventListener('click', () => {
    profileMenu.style.visibility = 'hidden'
});
// clicking anywhere else when having register/login form, or profile menu open, closes them
closeForms.addEventListener('click', () => {
    regForm.style.visibility = 'hidden';
    loginForm.style.visibility = 'hidden';
    profileMenu.style.visibility = 'hidden';
    picFormVisible.style.visibility = 'hidden';
});

// creates all articles with appropriate data fetched from the database
const articleContent = (user, date, media, title, format, id, profile_pic) => {
    if (format === 0) {   // if image -> create HTML with an <img> tag
        return `
<article class="feed-box"><div id="feed-bar"><button class="delete-button">Delete</button style="float: right;"><img src=${profile_pic}><a><p class="feed-user">${user}<p></a><div id="feed-right"></div></div><p class="feed-date">${date}</p><header>${title}</header><img src="${media}" ><div class="comment-div"><button class="show-comments">Show Comments</button><comment class="pic-comment"></comment><form class="comment-form" style="visibility: visible"  name="comment-form" ><input type="textarea" name="message" class="comment-text"><input class="id" type="hidden" name="id" value="${id}"><button type="submit" class="comment-send">Comment</button></form></div></div></div></article>`;

    } else {   // if video -> create a HTML with a <video> tag
        return `
<article class="feed-box"><div id="feed-bar"><button class="delete-button" style="float: right;">Delete</button><img src=<img src=${profile_pic}><a><p class="feed-user">${user}<p></a><div id="feed-right"></div></div><p class="feed-date">${date}</p><header>${title}</header><video src="${media}" width="75%" onclick="this.play()" controls="controls"></video><div class="comment-div"><comment class="pic-comment"></comment><form class="comment-form" style="visibility: visible" name="comment-form"><input type="textarea" name="message" class="comment-text" ><input class="id" type="hidden" name="id" id="id" value="${id}"<button type="submit" class="comment-send" >Comment</button></form></div></article>`;
    }
};

const getData = () => {
    let url = './all';
    if (!all) {
        url = './my';
    }
    fetch(url).then(response => {
        return response.json();
    }).then(items => {
        originalData = items;
        updateView(items);
    });

};

const updateView = (items) => {
    let media = items;
    let profilePic = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Blue_Question.svg/128px-Blue_Question.svg.png";
    for (let item of media) {
        // parses the post's date into a more readable form
        let date = `${media[0].vst.substring(0, 10)} at ${media[0].vst.substring(12, 19)}`;
        // checks if the uploader has a profile pic

        const article = document.createElement('article');
        // call createArticle to add html content to article
        article.innerHTML = articleContent(item.username, date, item.link, item.title, item.i_or_v, item.ID, profilePic);
        // add article to view
        document.querySelector('#global-feed').appendChild(article);

        const comments = article.querySelector('.pic-comment');
        const commentWindow = document.createElement("div");
        const showCommentButton = article.querySelector('.show-comments');
        const sendMessage = article.querySelector('.comment-form');

        // an event listener for commenting on a picture/video
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
                    return response.json();
                });
        });
        // fetches all comments for their appropriate messages by message ID
        getComments(item.ID, (results) => {
            console.log(results);

            showCommentButton.addEventListener('click', () => {
                if (comments.style.display === 'none') {
                    comments.style.display = '';
                    showCommentButton.textContent = 'Hide Comments';

                } else {
                    comments.style.display = 'none';
                    showCommentButton.textContent = 'Show Comments';
                }
            });
            let text = '';
            for (let res in results) {
                text += `<div class="comment-box"><p><span class="sender">${results[res].sender}</span><span class="comment">${results[res].content}</span></div>`;
            }
            commentWindow.innerHTML += text;
            comments.appendChild(commentWindow);
        });
        comments.style.display = 'none';
        commentWindow.className = 'comment-window';
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


const hideLogReg = (user) => {
    const commentForm = document.querySelectorAll('.comment-form');
    regButton.style.display = 'none';
    loginButton.style.display = "none";
    loginForm.style.display = 'none';
    regForm.style.display = 'none';
    showUsername.textContent = user;
    showUsername.style.visibility = 'visible';
    picProfile.style.visibility = 'visible';
    profileDrop.style.visibility = 'visible';
    uploadDiv.style.display = 'block';
    for (let c in commentForm) {
        commentForm[c].style.display = 'block';
    }

    //formVisible.style.visibility = 'visible';
};
getData();