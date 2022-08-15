// Este es el punto de entrada de tu aplicacion // RELACION CON EL DOM

import {
  savePost,
  eventLogout,
  // changePhoto,
} from './lib/index.js';

// FUNCION PARA REDIRIGIRSE DESDE EL INICIO

export const inicioPage = () => {
  document.getElementById('registrarmeInicio-button').addEventListener('click', () => {
    window.location.hash = '#/registro';
  });
  document.getElementById('loginInicio-button').addEventListener('click', () => {
    window.location.hash = '#/login';
  });
};

// CERRAR MODALES DE ERROR

export const closeModal = () => {
  document.querySelector('.close-modal').addEventListener('click', (e) => {
    e.preventDefault();
    const containerModal = document.querySelector('.background-modal');
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

// CERRAR SESIÓN

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  eventLogout();
  window.location.hash = '#/';
  window.location.reload();
  // document.getElementById('logout').style.display = 'none';
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
