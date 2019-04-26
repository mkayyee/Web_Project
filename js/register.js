const registerEvent = (thisEvent) => {
  let list = document.querySelectorAll('input');
  for (let i = 0; i < list.length; i++) {
    let current = list[i];
    if (current.name === 'firstname' || current.name === 'lastname'
        || current.name === 'password' || current.name === 'username') {
      if (current.value === '') {
        thisEvent.preventDefault();
        return false;
      }
    }
  }
};