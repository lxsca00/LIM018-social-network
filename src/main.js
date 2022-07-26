// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

import { changeView } from './view-controler/index.js';

// myFunction();

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);

// const templatePost = document.getElementById('plantillaOldPublication').content;
// const parentPost = document.getElementById('header');
// const oldPost = templatePost.cloneNode(true);
// parentPost.appendChild(oldPost);

// function sharePost() {
// const toShare = document.getElementById('toShare');
// toShare.addEventListener('click', () => {
// const templatePost = document.getElementById('plantilla-old-publication').content;
// const parentPost = document.getElementById('all-publications');
// const oldPost = templatePost.cloneNode(true);
// parentPost.appendChild(oldPost);
// });
// }
// sharePost;

