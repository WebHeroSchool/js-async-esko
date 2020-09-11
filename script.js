let defaultUser = 'aug512';
let newUser;
let href = document.location.href;
const $userAva = document.getElementById('avatar');
const $userText = document.getElementById('text');
const $loader = document.getElementById('loader');
const $userName = document.getElementById('name');
const $userBio = document.getElementById('bio');
const $userLink = document.getElementById('link');
const $date = document.getElementById('date');

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

let currentDate = new Date();

const getDate = new Promise((resolve, reject) => {
  setTimeout(() => currentDate ? resolve($date.innerHTML = currentDate.toDateString()) : reject('Не удалось получить дату'), 1500);
})

const renderCard = function (obj) {
  $loader.classList.toggle("hidden");
  $userAva.classList.toggle("hidden");
  $userText.classList.toggle("hidden");
  $userAva.src = obj.avatar_url;
  $userLink.innerHTML = obj.login;
  $userLink.href = obj.html_url;
  if (obj.bio != null) {
    $userBio.innerHTML = obj.bio;
  } else {
    $userBio.innerHTML = "This user haven't bio in profile :(";
  }
}

Promise.all([getDate])
    .then(() => fetch(apiLink))
    .then(res => res.json())
    .then(obj => newUser = Object.assign({}, obj))
    .then(newUser => renderCard(newUser))
    .catch(err => console.error(err));
