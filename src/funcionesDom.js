// Este es el punto de entrada de tu aplicacion // RELACION CON EL DOM

import {
  eventLogout,
  // obs,
  // changePhoto,
} from './lib/index.js';

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
export const flogout = () => {
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    eventLogout();
    window.location.hash = '#/';
    // window.location.reload();
  });
};
