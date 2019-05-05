'use strict';

const regButton = document.querySelector('#reg-button');
const regForm = document.querySelector('#register-form');
const regClose = document.querySelector('#register-close');
const loginButton = document.querySelector('#login-button');
const loginClose = document.querySelector('#login-close');
const loginForm = document.querySelector('#login-form');
const logOutBtn = document.querySelector("#logout");

logOutBtn.style.visibility = 'hidden';

// brings out the registration form
regButton.addEventListener("click", () => {
  if (loginForm.style.visibility === 'visible'){
    loginForm.style.visibility = 'hidden';
  }
  regForm.style.visibility = 'visible'
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
  loginForm.style.visibility = 'visible'
});

// closes the login form
loginClose.addEventListener("click", () => {
  loginForm.style.visibility = 'hidden'
});



const hideLogReg = () => {
  regButton.style.display = 'none';
  loginButton.style.display = "none";
  loginForm.style.display = 'none';
  regForm.style.display = 'none';
};

const showLogout = () => {
  logOutBtn.style.visibility = 'visible';
};

const logOut = () => {

};

logOutBtn.addEventListener('click', logOut);
