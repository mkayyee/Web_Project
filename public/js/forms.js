'use strict';

// brings out the upload form
uploadDrop.addEventListener('click',()=>{
    profileMenu.style.visibility = 'hidden';

    if (uploadDiv.style.display === 'none') {
        uploadDiv.style.display = 'block';
    }
    else{
        uploadDiv.style.display = 'none';
    }
});
// upload picture form
uploadPic.addEventListener('click', ()=>{
    uploadVidForm.style.display = 'none';
    if(uploadPicForm.style.display === 'none'){
        uploadPicForm.style.display = 'block';
    }
    else{
        uploadPicForm.style.display = 'none';
    }
});
// upload video form
uploadVid.addEventListener('click',()=>{
    uploadPicForm.style.display = 'none';
    if(uploadVidForm.style.display === 'none'){
        uploadVidForm.style.display = 'block';
    }
    else{
        uploadVidForm.style.display = 'none';
    }
});
// clicking on profile at the top right corner brings out profile menu if not visible, hides if visible
profileDrop.addEventListener('click', () => {
    uploadDiv.style.display = 'none';
    if (profileMenu.style.visibility === 'visible') {
        profileMenu.style.visibility = 'hidden';
    } else {
        profileMenu.style.visibility = 'visible';
    }
});
profileClose.addEventListener('click', () => {
    profileMenu.style.visibility = 'hidden'
});

// brings out the form for changing profile pic
changePicButton.addEventListener('click', () => {
    profileMenu.style.visibility = 'hidden';
    picFormVisible.style.visibility = 'visible';
});

// closes the profile pic form
closeProfilePic.addEventListener('click', () => {
    picFormVisible.style.visibility = 'hidden'
});

// brings out the registration form
regButton.addEventListener("click", () => {
    if (loginForm.style.visibility === 'visible') {
        loginForm.style.visibility = 'hidden';
        loginButton.style.backgroundColor = '#835C21';
    }
    if (regForm.style.visibility === 'visible') {
        regForm.style.visibility = 'hidden';
        regButton.style.backgroundColor = '#835C21';
    } else {
        regForm.style.visibility = 'visible';
        regButton.style.backgroundColor = '#F7B649';

    }
});

// closes the registration form
regClose.addEventListener("click", () => {
    regForm.style.visibility = 'hidden';
    regButton.style.backgroundColor = '#835C21';
});

// brings out the login form
loginButton.addEventListener("click", () => {
    if (regForm.style.visibility === 'visible') {
        regForm.style.visibility = 'hidden';
        regButton.style.backgroundColor = '#835C21';
    }
    if (loginForm.style.visibility === 'visible') {
        loginForm.style.visibility = 'hidden';
        loginButton.style.backgroundColor = '#835C21';
    } else {
        loginForm.style.visibility = 'visible';
        loginButton.style.backgroundColor = '#F7B649';
    }
});

// closes the login form
loginClose.addEventListener("click", () => {
    loginForm.style.visibility = 'hidden';
    loginButton.style.backgroundColor = '#835C21';
});

// clicking anywhere else when having register/login form, or profile menu open, closes all forms and menus
closeForms.addEventListener('click', () => {
    regForm.style.visibility = 'hidden';
    loginForm.style.visibility = 'hidden';
    profileMenu.style.visibility = 'hidden';
    picFormVisible.style.visibility = 'hidden';
    loginButton.style.backgroundColor = '#835C21';
    regButton.style.backgroundColor = '#835C21';
    uploadDiv.style.display = 'none';
    uploadVidForm.style.display = 'none';
    uploadPicForm.style.display = 'none';
    let userWindow = document.querySelectorAll('.user-window');
    for(let element in userWindow){
        if (userWindow[element].style !== undefined) {
            userWindow[element].style.visibility = 'hidden';
        }
    }
});