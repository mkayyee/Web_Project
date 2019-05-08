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


const hideLogReg = (user) => {
    regButton.style.display = 'none';
    loginButton.style.display = "none";
    loginForm.style.display = 'none';
    regForm.style.display = 'none';
    showUsername.textContent = user;
    showUsername.style.visibility = 'visible';
    picProfile.style.visibility = 'visible';
    profileDrop.style.visibility = 'visible';
    uploadDiv.style.display = 'block';
};


const logOut = () => {

};

logOutBtn.addEventListener('click', logOut);

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
        console.log(json);
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
        console.log(json);
        vidForm.reset();
        getData();
    });

};
vidForm.addEventListener('submit', sendVideoForm);


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

closeForms.addEventListener('click', () => {
    regForm.style.visibility = 'hidden';
    loginForm.style.visibility = 'hidden';
    profileMenu.style.visibility = 'hidden';
});

const articleContent = (user, date, media, title, format) => {
    if (format === 0) {   // if image -> send form with an <img>
        return `

<article class="feed-box"><div id="feed-bar"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Blue_Question.svg/128px-Blue_Question.svg.png"><a><p class="feed-user">${user}<p></a><div id="feed-right"><div id="dropdown-menu"><button id="menu-button" onclick = menuFunction()><i class="fas" class="fa-angle-down"></i></button></div></div></div><p class="feed-date">${date}</p><header>${title}</header><img src="${media}" ><div class="modal" id="button-modal'></div class="modal-inner"><button>Comment</button><button>Like</button></div></div></article>`;

    } else {   // if not -> send form with a <video> tag
        return `

<article class="feed-box"><div id="feed-bar"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Blue_Question.svg/128px-Blue_Question.svg.png"><a><p class="feed-user">${user}<p></a><div id="feed-right"><div id="dropdown-menu"><button id="menu-button" onclick = menuFunction()><i class="fas" class="fa-angle-down"></i></button></div></div></div> <p class="feed-date">${date}</p><header>${title}</header><video src="${media}" width="75%" onclick="this.play()" controls="controls"></video></article>`;
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
        // 3. update view
        updateView(items);
    });
};


const updateView = (items) => {
    for (let item of items) {
        let date = `${items[0].vst.substring(0,10)} at ${items[0].vst.substring(12,19)}`;
        const article = document.createElement('article');
        // call createArticle to add html content to article
        article.innerHTML = articleContent(item.username, date, item.link, item.title, item.i_or_v);
        // add article to view
        document.querySelector('#global-feed').appendChild(article);
    }
};
getData();


const menuFunction = () => {
    document.getElementById('button-modal').style.display = 'block';
};

