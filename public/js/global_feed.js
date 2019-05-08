'use strict';
//Creates global feed elements on page load.
//To-do: create feed element according to specifications and load
//the correct data.

const updateFeed = (user, date, image, title) => {
    let article = document.createElement('article');
    article = articleContent(user, date, image, title);
    document.getElementById('global-feed').appendChild(article);

};
const addModal = () => {
    //Modal menu
    const modal = document.createElement('div');
    modal.id = 'button-modal';
    modal.classList.add('modal');
    const modalButtons = document.createElement('div');
    modalButtons.classList.add('modal-inner');
    const button1 = document.createElement('button');
    button1.innerText = 'Comment';
    const button2 = document.createElement('button');
    button2.innerText = 'Like';
    const button3 = document.createElement('button');
    button3.innerText = 'Remove';

    modalButtons.appendChild(button1);
    modalButtons.appendChild(button2);
    modalButtons.appendChild(button3);
    modal.appendChild(modalButtons);

    document.getElementById('global-feed').appendChild(modal);
};


window.onclick = (event) => {
    if (event.target === document.getElementById('button-modal')) {
        document.getElementById('button-modal').style.display = 'none';
    }
};

updateFeed();
addModal();

