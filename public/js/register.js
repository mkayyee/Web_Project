'use strict';

const registerValid = (event) => {

  let firstName = document.forms['register-form']['firstname'].value;
  let lastName = document.forms['register-form']['lastname'].value;
  let userName = document.forms['register-form']['username'].value;
  let password = document.forms['register-form']['password1'].value;
  let passwordAgain = document.forms['register-form']['password2'].value;

  const data = JSON.stringify({
    firstname: firstName,
    lastname: lastName,
    username: userName,
    password: password
  });

  if (firstName === "") {
    alert("First name is missing.");
    return false;
  }

  if (lastName === "") {
    alert("Last name is missing.");
    return false;
  }

  if (userName === "") {
    alert("Username is missing.");
    return false;
  }

  if (password === "") {
    alert("Password is missing.");
    return false;
  }

  if (passwordAgain === "") {
    alert("Please write your password in both boxes.");
    return false;
  }
  if (password !== passwordAgain) {
    alert("Passwords do not match.");
    return false;
  }

  event.preventDefault();

  registerSubmit(data,(err)=>{
    if (err){
      alert('Username taken.')
    }
  })
};
const registerSubmit = (data) => {

  const settings = {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  };
  
  fetch('./register', settings)
      .then((response) => {
        return response.json();
  }).then((json) =>{
    hideLogReg();
    showLogout();
  })
};
