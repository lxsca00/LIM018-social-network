// Este es el punto de entrada de tu aplicacion // RELACION CON EL DOM

import {
  eventRegister,
  eventLogin,
  obs, eventLogout,
  googleSignIn,
  facebookSignIn,
  comentario,
  // getUserData,
  saveData,
  changePhoto,
} from './lib/index.js';

import { countries } from './view/countries.js';

// REGISTRO DE USUARIO

export const fEventRegister = () => {
  const signUpForm = document.querySelector('#register-form');
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const name = document.getElementById('user-name').value;
    const username = document.getElementById('user-username').value;
    const country = '';
    const description = '';
    const birth = '';
    const photo = '';
    eventRegister(name, username, email, password, country, description, birth, photo);
  });
};

// AUTENTIFICACIÓN DE USUARIO -LOGIN CON CONTRASEÑA
export const fEventLogin = () => {
  document.getElementById('home-li').style.display = 'none';
  document.getElementById('perfil-li').style.display = 'none';
  document.getElementById('logout').style.display = 'none';
  document.getElementById('registro-li').style.display = 'block';
  document.getElementById('login').style.display = 'block';
  const signInForm = document.querySelector('#form-login');
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    eventLogin(email, password);
    obs();
  });
};

// CERRAR MODALES DE ERROR

export const closeModal = () => {
  document.querySelector('.close-modal').addEventListener('click', (e) => {
    e.preventDefault();
    const containerModal = document.querySelector('.background-modal-error');
    containerModal.style.visibility = 'hidden';
    if (window.location.hash === '#/registro') {
      const signUpForm = document.querySelector('#register-form');
      signUpForm.reset();
    } else if (window.location.hash === '#/login') {
      const signInForm = document.querySelector('#form-login');
      signInForm.reset();
    }
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
// export const fEventLogout = () => {
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  eventLogout();
  window.location.hash = '#/';
  document.getElementById('logout').style.display = 'none';
});

// FUNCION PARA COMPARTIR UN POST EN HOME
export function fSharePost() {
  document.getElementById('home-li').style.display = 'block';
  document.getElementById('perfil-li').style.display = 'block';
  document.getElementById('logout').style.display = 'block';
  document.getElementById('registro-li').style.display = 'none';
  document.getElementById('login').style.display = 'none';
  const toShare = document.getElementById('toShare');
  let numberPost = 0;
  toShare.addEventListener('click', () => {
    const post = document.getElementById('comment').value; // para guardat post en BD FIRESTORE
    comentario(post);
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
    const divPost = document.getElementById(`post ${numberPost - 1}`);
    divElem.innerHTML = oldPost;
    // return parentPost.appendChild(divElem);
    if (divElem.id === 'post 1') {
      (parentPost.appendChild(divElem));
    } else {
      (parentPost.insertBefore(divElem, divPost));
    }
    document.querySelector('.old-comment').value = post;
  });
}

// Función para editar la foto de perfil del usuario

export const fChangePhoto = () => {
  const editPhoto = document.getElementById('edit').value;
  changePhoto(editPhoto);
};

// Función para que aparezca un modal para editar perfil

export const editProfile = () => {
  document.getElementById('editProfile').addEventListener('click', (e) => {
    e.preventDefault();
    const profile = document.querySelector('.profile');
    const modal = `
    <div class="modal-edit">
      <div class="modal-card">
        <p> EDITAR PERFIL</p>
        <form id="edit-profile">
          <select id="select-country">
            <option value=" " disabled select> Selecciona tu país </option>
          </select>
          <input type="date" id="select-birth" max="2009-01-01"> </input>
          <input type="text" id="change-description" placeholder="Aquí va tu descripción">
          <select id="change-preferences">
            <option values="" disabled select> ¿Qué prefieres ver? </option>
            <option value="Peliculas"> Peliculas </option>
            <option value="Series"> Series </option>
          </select>
          <input type="text" id="change-genre" placeholder="¿Cuáles son tus géneros favoritos?">
          <button type="button" id="save-changes" class="btnInicio"> GUARDAR CAMBIOS </button>
          <button id="close" class="btnInicio"> CERRAR </button>
        </form>
      </div>
    <div>`;
    profile.insertAdjacentHTML('beforeend', modal);
    const selectCountry = document.querySelector('#select-country');
    countries.forEach((userCountry) => {
      const category = `<option value="${userCountry}"> ${userCountry} </option>`;
      selectCountry.insertAdjacentHTML('beforeend', category);
    });
    const selectPreference = document.querySelector('#change-preferences');
    const containerModal = document.querySelector('.modal-edit');
    document.querySelector('#save-changes').addEventListener('click', () => {
      const newDescription = document.getElementById('change-description').value;
      const oldDescription = document.querySelector('.user-description');
      const country = selectCountry.options[selectCountry.selectedIndex].value;
      const birth = document.querySelector('#select-birth').value;
      const preference = selectPreference.options[selectPreference.selectedIndex].value;
      const favGenre = document.querySelector('#change-genre').value;
      // getUserData();
      saveData(country, newDescription, birth, preference, favGenre);
      if (newDescription !== '') {
        oldDescription.innerHTML = newDescription;
        containerModal.remove();
      }
    });
    document.querySelector('#close').addEventListener('click', () => {
      containerModal.remove();
    });
  });
};

// funcion para registrarse

export const inicioPage = () => {
  document.getElementById('registrarmeInicio-button').addEventListener('click', () => {
    window.location.hash = '#/registro';
  });
  document.getElementById('loginInicio-button').addEventListener('click', () => {
    window.location.hash = '#/login';
  });
};
