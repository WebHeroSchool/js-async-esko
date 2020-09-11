let defaultUser = 'aug512';
let newUser;
let href = document.location.href;
const $userAva = document.getElementById('avatar');
const $userName = document.getElementById('name');
const $userBio = document.getElementById('bio');
const $userLink = document.getElementById('link');

const generateUrl = function () {
  let user = href.split('=');
  if (user[1]) {
    username = user[1];
  } else {
    username = defaultUser
  };
  return 'https://api.github.com/users/' + username;
}

let apiLink = generateUrl();

const renderCard = function (obj) {
  if (obj[0] != undefined) {
    $userAva.src = obj.avatar_url;
    $userName.innerHTML = obj.name;
    $userLink.href = obj.html_url;
    $userBio.innerHTML = obj.bio;
  } else {
    console.log('Unexpected error :(')
  }
}

fetch(apiLink)
    .then(res => { return res.json()})
    .then(userData => renderCard(userData))
    .catch(err => console.log(err));
