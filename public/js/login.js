'use strict';

const loginValid = (event) => {

  let userName = document.forms['login-form']['username'].value;
  let password = document.forms['login-form']['password'].value;

  if (userName === "") {
    alert("Username is missing.");
    return false;
  }

  if (password === "") {
    alert("Password is missing.");
    return false;
  }

  event.preventDefault();
  loginSubmit();
};

const loginSubmit = () => {
  let userName = document.forms['login-form']['username'].value;
  let password = document.forms['login-form']['password'].value;

  const data = JSON.stringify({
    username: userName,
    password: password
  });

  const settings = {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  };

  fetch('./login', settings)
  .then((response) => {
    console.log(1);
    return response.json();
  }).then((json) => {
    hideLogReg();
    showLogout();
  });
};