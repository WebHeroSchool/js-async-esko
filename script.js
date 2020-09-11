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
  $userAva.src = obj.avatar_url;
  $userLink.innerHTML = obj.name;
  $userLink.href = obj.html_url;
  if (obj.bio != '') {
    $userBio.innerHTML = obj.bio;
  } else {
    $userBio.innerHTML = "This user haven't bio in profile";
  }
}

fetch(apiLink)
    .then(res => { return res.json()})
    .then(obj => newUser = Object.assign({}, obj))
    .then(renderCard(newUser))
    .catch(err => console.log(err));
