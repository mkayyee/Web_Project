'use strict';

//NEXT: get profile photo and username side by side

//select profile-content element as main
const main = document.getElementById('profile-box');

//create profileHeader
const profileHeader = document.createElement('div');
main.appendChild(profileHeader);

//create profile photo
const profilePic = document.createElement('img');
profilePic.src = 'https://66.media.tumblr.com/ffff32391908e3fc6b90ab7b71783f29/tumblr_pa8jsqxoUr1x1ko3mo1_400.jpg';
profileHeader.appendChild(profilePic);

//create username
const username = document.createElement('p');
username.innerText = 'MyUsername';          //Username from db
profileHeader.appendChild(username);

