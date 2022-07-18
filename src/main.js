// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

import { changeView } from './view-controler/index.js';

// myFunction();

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);

// para comentar una publicacion

function imprimir() {
  const toShare1 = document.getElementById('toShare');
  toShare1.addEventListener('click', () => {
    const templatePost = document.getElementById('plantilla-old-publication').content;
    const parentPost = document.getElementById('all-publications');
    const oldPost = templatePost.cloneNode(true);
    parentPost.appendChild(oldPost);
  });
}

if (document.readyState === 'complete') {
  imprimir();
}
