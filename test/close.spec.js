/* /**
 * @jest-environment jsdom
 */

import { flogout, closeModal } from '../src/funcionesDom.js';
import { registerTemplate } from '../src/view/register.js';
import { loginTemplate } from '../src/view/login.js';
// import { eventLogout } from '../src/lib/index.js';
/* import {
  signOut,
} from '../src/lib/firebase.js';
 */
jest.mock('../src/lib/firebase.js');

describe('flogout', () => {
  document.body.innerHTML = `
  <a href="#/home" id="home-li">Home</a>
  <a href="#/profile" id="perfil-li">Ver tu perfil</a>
  <a href="#/profile" id="registro-li">Ver tu perfil</a>
  <a href="#/cerrarSesion" id="logout"> Cerrar sesión</a>`;

  const btnLogout = document.querySelector('#logout');
  it('debería ser una función', () => {
    expect(typeof flogout).toBe('function');
  });
  it('deberias cambiar a ruta #/', (done) => {
    expect(btnLogout instanceof HTMLElement).toBe(true);
    flogout();
    btnLogout.click();
    const changeRoute = () => {
      expect(window.location.hash).toBe('#/');
      window.removeEventListener('hashchange', changeRoute);
      done();
    };
    window.addEventListener('hashchange', changeRoute);
  });
});

describe('closeModal', () => {
//   document.body.innerHTML = `
//   <div class="background-modal">
//   <div class="modal-error">
//     <p class="login-error"> Hay un error </p>
//     <button class="close-modal"> CERRAR </button>
//   </div>
// <div>`;
  document.body.appendChild(registerTemplate());
  document.body.appendChild(loginTemplate());
  const btnCloseModal = document.querySelector('.close-modal');
  it('debería ser una función', () => {
    expect(typeof closeModal).toBe('function');
  });
  it('deberia mostrar signupForm', (done) => {
    const containerModal = document.querySelector('.background-modal');
    (window.location.hash = '#/registro');
    closeModal();
    btnCloseModal.click();
    expect(btnCloseModal instanceof HTMLElement).toBe(true);
    expect(containerModal.style.visibility).toBe('hidden');
    // expect(window.location.hash).toBe('#/registro');
    // signUpForm.reset();
    done();
  });

  it('deberia mostrar signInForm', () => {
    const containerModal = document.querySelector('.background-modal');
    (window.location.hash = '#/login');
    closeModal();
    btnCloseModal.click();
    expect(btnCloseModal instanceof HTMLElement).toBe(true);
    expect(containerModal.style.visibility).toBe('hidden');
    // expect(window.location.hash).toBe('#/login');
    // signInForm.reset();
  });
});
