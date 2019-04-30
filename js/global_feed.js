'use strict';

//Creates global feed elements on page load.
//To-do: create feed element according to specifications and load
//the correct data.
const updateFeed = () => {
  for (let i = 0; i < 10; i++) {
    let article = document.createElement('article');
    article = articleContent();
    document.getElementById('global-feed').appendChild(article);
  }
};

const articleContent = () => {
  let article = document.createElement('article');
  article.classList.add('feed-box');

  //Feed profile small picture
  const userPic = document.createElement('IMG');
  userPic.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Blue_Question.svg/128px-Blue_Question.svg.png';

  //Feed username
  const username = document.createElement('a');
  username.innerText = 'Dummy username';
  //Link should take to profile page
  username.href = 'Dummy generic link/' + 'username';

  //Feed element time
  const postDateTime = document.createElement('p');
  postDateTime.innerText = '00:01 ' + '01.01.2001';

  //Feed dropdown menu
  const menu = document.createElement('div');
  const menuButton = document.createElement('button');
  const menuIcon = document.createElement('i');
  menuIcon.classList.add('fas', 'fa-angle-down');
  menuButton.appendChild(menuIcon);
  menuButton.onclick = menuFunction();
  menu.appendChild(menuButton);

  //Create feed bar right side
  const barRight = document.createElement('div');
  barRight.id = 'feed-right';
  barRight.appendChild(postDateTime);
  barRight.appendChild(menu);

  const pic = document.createElement('IMG');
  pic.src = 'https://images.pexels.com/photos/259803/pexels-photo-259803.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

  //Feed description
  const description = document.createElement('header');
  description.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at quam lacinia, blandit turpis nec, commodo enim. Mauris consequat leo scelerisque, rhoncus sem eu, fermentum nunc.';

  const feedTopBar = document.createElement('div');
  feedTopBar.id = 'feed-bar';
  feedTopBar.appendChild(userPic);
  feedTopBar.appendChild(username);
  feedTopBar.appendChild(barRight);

  article.appendChild(feedTopBar);
  article.appendChild(pic);
  article.appendChild(description);

  return article;
};

const menuFunction = () => {

};

updateFeed();