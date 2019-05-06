'use strict';
//profile content holds all content in profile
//profileHeader holds profile pic, username etc.
//posts hold a single post TBD


//select profile-content element as main
const main = document.getElementById('profile-content');

//create profileHeader
const profileHeader = document.createElement('div');
profileHeader.id = 'profile-header';
main.appendChild(profileHeader);

//create profile photo
const profilePic = document.createElement('img');
profilePic.id = 'header-element';
profilePic.src = 'https://cdn6.aptoide.com/imgs/b/9/9/b99954a7c6209324ed46b6d49fd1b623_icon.png?w=128';
profileHeader.appendChild(profilePic);

//create username
const username = document.createElement('p');
username.innerText = 'MyUsername';          //Username from db
username.id = 'header-element';
profileHeader.appendChild(username);

//create name
const name = document.createElement('p');
name.id = 'header-element';
name.innerText = 'First Last';          //Name from db
profileHeader.appendChild(name);

//create location
const loc = document.createElement('p');
loc.id = 'header-element';
loc.innerText = 'Location';             //location from db
profileHeader.appendChild(loc);

//create description
const desc = document.createElement('p');
desc.id = 'header-element';
desc.innerText = 'Info about me :--)';
profileHeader.appendChild(desc);        //description from db

//profile posts start here!






