// Este es el punto de entrada de tu aplicacion // RELACION CON EL DOM

import {
  eventRegister,
  eventLogin,
  obs, eventLogout,
  googleSignIn,
  facebookSignIn,
  savePost,
  saveData,
  // changePhoto,
} from './lib/index.js';

import { countries } from './view/countries.js';

// FUNCION PARA REDIRIGIRSE DESDE EL INICIO

export const inicioPage = () => {
  document.getElementById('registrarmeInicio-button').addEventListener('click', () => {
    window.location.hash = '#/registro';
  });
  document.getElementById('loginInicio-button').addEventListener('click', () => {
    window.location.hash = '#/login';
  });
};

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
  document.querySelector('#button-google').addEventListener('click', (e) => {
    e.preventDefault();
    googleSignIn();
  });
};

// INICIAR SESIÓN CON FACEBOOK

export const fFacebookSignIn = () => {
  document.querySelector('#button-facebook').addEventListener('click', (e) => {
    e.preventDefault();
    facebookSignIn();
  });
};

// CERRAR SESIÓN

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
  const formPublication = document.querySelector('#form-publication');
  formPublication.addEventListener('submit', (e) => {
    e.preventDefault();
    const postContent = document.querySelector('#comment').value;
    savePost(postContent);
    formPublication.reset();
  });
}

// Función para editar la foto de perfil del usuario

/* export const fChangePhoto = () => {
  const editPhoto = document.getElementById('edit').value;
  changePhoto(editPhoto);
}; */

// Función para que aparezca un modal para editar perfil

export const editProfile = () => {
  document.getElementById('editProfile').addEventListener('click', (e) => {
    e.preventDefault();
    const containerModal = document.querySelector('.modal-edit');
    containerModal.style.visibility = 'visible';
    const selectCountry = document.querySelector('#select-country');
    countries.forEach((userCountry) => {
      const category = `<option value="${userCountry}"> ${userCountry} </option>`;
      selectCountry.insertAdjacentHTML('beforeend', category);
    });
    selectCountry.children[0].disabled = true;
    const selectPreference = document.querySelector('#change-preferences');
    selectPreference.children[0].disabled = true;
    document.querySelector('#save-changes').addEventListener('click', () => {
      const country = selectCountry.options[selectCountry.selectedIndex].value;
      const preference = selectPreference.options[selectPreference.selectedIndex].value;
      const newDescription = document.getElementById('change-description').value;
      const birth = document.querySelector('#select-birth').value;
      const favGenre = document.querySelector('#change-genre').value;
      saveData(country, newDescription, birth, preference, favGenre);
      containerModal.style.visibility = 'hidden';
    });
    document.querySelector('#close').addEventListener('click', () => {
      e.preventDefault();
      containerModal.style.visibility = 'hidden';
    });
  });
};
