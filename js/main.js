window.onload = () => {

  for (let i = 0; i < 10; i++) {
    let article = document.createElement('article');
    article.classList.add('feed-box');
    let text = document.createElement('header');
    text.innerText = 'One global feed element placeholder.';
    const pic = document.createElement('IMG');
    pic.src = 'https://images.pexels.com/photos/259803/pexels-photo-259803.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
    article.appendChild(pic);
    article.appendChild(text);
    document.getElementById('global-feed').appendChild(article);
  }
};
