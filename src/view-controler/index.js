import {
  closeModal,
  flogout,
} from '../funcionesDom.js';
import { components } from '../view/index.js';
import { activeUserProfile, editProfile } from '../view/profile.js';
import { fEventLogin, fGoogleSignIn } from '../view/login.js';
import { fEventRegister } from '../view/register.js';
import { fSharePost, onGetPosts, activeUserHome } from '../view/home.js';
import { auth } from '../lib/firebase.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  const user = auth.currentUser;
  container.innerHTML = '';
  switch (route) {
    case '#/': {
      if (user) {
        window.location.hash = '#/home';
        break;
      }
      container.appendChild(components.inicio());
      break; }
    case '#/home': {
      container.appendChild(components.home());
      activeUserHome();
      onGetPosts();
      fSharePost();
      flogout();
      break; }
    case '#/registro': {
      container.appendChild(components.register());
      fEventRegister();
      closeModal();
      break; }
    case '#/login': {
      container.appendChild(components.login());
      fGoogleSignIn();
      fEventLogin();
      closeModal();
      break; }
    case '#/profile':
    { container.appendChild(components.profile());
      activeUserProfile();
      editProfile();
      break; }
    default: {
      container.appendChild(components.error());
      break;
    }
  }
};


// CERRAR SESIÓN
export const fEventLogout = () => {
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    eventLogout();
  });
};

// FUNCION PARA COMPARTIR UN POST EN HOME
export function fSharePost() {
  const toShare = document.getElementById('toShare');
  let numberPost = 0;
  toShare.addEventListener('click', () => {
    const oldPost = `
      <div class="old-publication" >
        <p class="user-name-post">AQUI VA EL NOMBRE DE USUARIO</p>
        <input type="text" class="old-comment">
        <div class="container-button">
          <div class="emojis">
            <input type="button" title="Click to coment" value="🍿"  class="button-emoji" >
            <input type="button" title="Click to coment" value="🤍"  class="button-emoji" >
          </div>
         <input type="button" title="Click to coment" value="Comentar "  class="comment-button" >
        </div>
          </div>
      </div>`;

    const parentPost = document.getElementById('all-publications');
    const divElem = document.createElement('div');
    // se debe almacenar en un solo div porque sino "to Node.appendChild must be an instance of Nod"
    numberPost += 1;
    divElem.id = `post ${numberPost}`;
    divElem.innerHTML = oldPost;
    return parentPost.appendChild(divElem);
  });
}
