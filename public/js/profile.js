'use strict';

let main = document.getElementById('profile-content');

console.log(main);

const profilePic = document.createElement('img');
profilePic.src = 'https://66.media.tumblr.com/ffff32391908e3fc6b90ab7b71783f29/tumblr_pa8jsqxoUr1x1ko3mo1_400.jpg';

console.log(profilePic);

//let article = document.createElement('article');
//article.appendChild(profilePic);

main.appendChild(profilePic);