
import { firebase } from "./firebase.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import { Router, Page } from './routing.js'
import { loadOutfitData,loadUserProfile } from "./common.js";
import { wardrowizAlert} from "./common.js";

//User check
onAuthStateChanged(firebase.getAuth(), async (user) => {
  if (user) {
    firebase.setUser(user);
    // firebase.loadData();

//     console.log(firebase.getUser().email);
// console.log(firebase.getUser());
wardrowizAlert(`Welcome back ${firebase.getUser().displayName}`);

    loadOutfitData();

    const userProfile = await loadUserProfile();

    if (userProfile && userProfile.size == 0) {
      window.location.href = "#profilecreation";
    } else {
      window.location.href = "#userhome";
    }
  } else {
    firebase.setUser(null);

    window.location.href = "#home";
  }
});


const loadRouter = () =>{
  Router.init('mainArea','headerArea','footerArea', [
    new Page('#login', 'pages/login.html','pages/home-header.html'),
    new Page('#userhome', 'pages/userhome.html','pages/header.html'),
    new Page('#home', 'pages/home.html','pages/home-header.html'),
    new Page('#signup', 'pages/signup.html','pages/home-header.html'),     
    new Page('#mycloset', 'pages/viewwardrobe.html','pages/header.html'),
    new Page('#profile', 'pages/profile.html','pages/header.html'),
    new Page('#lookbook', 'pages/lookbook.html','pages/header.html'),
    new Page('#profilecreation', 'pages/profilecreation.html','pages/header.html'),
    new Page('#uploadoutfithome', 'pages/uploadoutfit.html','pages/header.html'),
    new Page('#uploadoutfitmycloset', 'pages/uploadoutfit.html','pages/header.html'),
    new Page('#contact', 'pages/contact.html','pages/header.html'),
    new Page('#404page', 'pages/404page.html','pages/header.html'),
    new Page('#subscription', 'pages/subscription.html','pages/header.html')

  ])
};

/* loadRouter(); */
//setting up the Router with pages
setTimeout(loadRouter
,50);


window.addEventListener('offline', () => {
  localStorage.setItem('name', firebase.getUser().name);

  wardrowizAlert('Oh snap !, Please try to connect again to network');
 // window.location.href = '#404page'

});

window.addEventListener('online', () => {
  window.location.href = '#userhome'

  //wardrowizAlert(`Welcome back ${firebase.getUser().name}`);

});

const images = [
  'https://media.geeksforgeeks.org/wp-content/uploads/20200316135008/red7.png',
  'https://media.geeksforgeeks.org/wp-content/uploads/20200316135014/yellow3.png',
  'https://media.geeksforgeeks.org/img-practice/MaskGroup58@2x-min-1637846347.png',
  'https://media.geeksforgeeks.org/img-practice/banner/dsa-self-paced-course-overview-image.png',
  'https://media.geeksforgeeks.org/img-practice/banner/complete-interview-preparation-thumbnail.png',
  'https://media.geeksforgeeks.org/img-practice/banner/Amazon-Test-Series-thumbnail.png',

'https://media.geeksforgeeks.org/img-practice/banner/Amazon-Test-Series-thumbnail.png',

'https://media.geeksforgeeks.org/img-practice/banner/Amazon-Test-Series-thumbnail.png',
  'https://media.geeksforgeeks.org/img-practice/banner/dsa-self-paced-thumbnail.png'
];

