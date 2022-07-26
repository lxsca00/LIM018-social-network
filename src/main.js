// Este es el punto de entrada de tu aplicacion // RELACION CON EL DOM

import {
  eventRegister,
  eventLogin,
  eventLogout,
  googleSignIn,
  facebookSignIn,
  // saveTask,
} from './lib/index.js';

// eslint-disable-next-line import/no-cycle
import { changeView } from './view-controler/index.js';

// PARA CAMBIAR DE VISTA
const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);

// REGISTRO DE USUARIO

export const fEventRegister = () => {
  const signUpForm = document.querySelector('#register-form');
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const name = document.getElementById('user-name').value;
    const username = document.getElementById('user-username').value;
    const country = document.getElementById('user-country').value;
    const birth = document.getElementById('user-birth').value;
    eventRegister(name, username, email, password, country, birth);
  });
};

// AUTENTIFICACIÓN DE USUARIO -LOGIN
// INICIAR SESIÓN
export const fEventLogin = () => {
  const signInForm = document.querySelector('#form-login');
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    eventLogin(email, password);
  });
};

// INICIAR SESIÓN CON GOOGLE
export const fGoogleSignIn = () => {
  document.querySelector('.image-google').addEventListener('click', (e) => {
    e.preventDefault();
    googleSignIn();
  });
};

// INICIAR SESIÓN CON FACEBOOK
export const fFacebookSignIn = () => {
  document.querySelector('.image-facebook').addEventListener('click', (e) => {
    e.preventDefault();
    facebookSignIn();
  });
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
  const comment = document.getElementById('comment').value;
  saveTask(comment);
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

// Función para que aparezca un modal para editar perfil

export const editProfile = () => {
  document.getElementById('editProfile').addEventListener('click', (e) => {
    e.preventDefault();
    const profile = document.querySelector('.profile');
    const modal = `
    <div class="modal-edit">
      <div class="modal-card">
        <button class="close">&times;</button>
        <h3> Editar perfil </h3>
        <input type="text" id="changeDescription" placeholder="Aquí va tu descripción">
        <h3> ¿Qué prefieres ver? </h3>
        <input type="text" id="changeElection" placeholder="¿Peliculas o series?">
        <h3> ¿Tu género favorito? <h3>
        <input type="text" id="changeGenre" placeholder="Cuentanos cuáles son tus géneros favoritos">
        <button type="button" id="saveChanges"> Guardar cambios </button>
      </div>
    <div>`;
    profile.insertAdjacentHTML('beforeend', modal);
    document.querySelector('.close').addEventListener('click', () => {
      const containerModal = document.querySelector('.modal-edit');
      containerModal.remove();
    });
    document.querySelector('#saveChanges').addEventListener('click', () => {
      const newDescription = document.getElementById('changeDescription').value;
      const oldDescription = document.querySelector('.user-description');
      const containerModal = document.querySelector('.modal-edit');
      if (newDescription !== '') {
        oldDescription.innerHTML = newDescription;
        containerModal.remove();
      }
    });
  });
};

// funcion para registrarse

export const inicioPage = () => {
  document.getElementById('registrarmeInicio-button').addEventListener('click', () => {
    document.getElementById('header').style.visibility = 'visible';

    window.location.hash = '#/registro';
  });
  document.getElementById('loginInicio-button').addEventListener('click', () => {
    document.getElementById('header').style.visibility = 'visible';
    window.location.hash = '#/login';
  });
};
