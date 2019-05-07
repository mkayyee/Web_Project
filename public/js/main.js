'use strict';

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


// brings out the registration form
regButton.addEventListener("click", () => {
    if (loginForm.style.visibility === 'visible') {
        loginForm.style.visibility = 'hidden';
    }
    if(regForm.style.visibility === 'visible'){
        regForm.style.visibility = 'hidden';
    }
    else {
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
    if(loginForm.style.visibility === 'visible'){
        loginForm.style.visibility = 'hidden';
    }
    else {
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
};


const logOut = () => {

};

logOutBtn.addEventListener('click', logOut);

const frm = document.querySelector('#upload-form');

const sendForm = (evt) => {
    evt.preventDefault();
    const fd = new FormData(frm);
    const settings = {
        method: 'post',
        body: fd,
    };

    fetch('./image', settings).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json);
        frm.reset();
    });
};
frm.addEventListener('submit', sendForm);


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

