/**
 * @jest-environment jsdom
 */
/* eslint-disable max-len */
import {
  loginTemplate,
  fEventLogin,
  fGoogleSignIn,
} from '../src/view/login.js';

import {
  // signInWithPopup,
  signInWithEmailAndPassword,
} from '../src/lib/firebase.js';

jest.mock('../src/lib/firebase.js');
// jest.setTimeout(10000);
// /* **************** LOGIN DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
describe('fEventLogin', () => {
  document.body.appendChild(loginTemplate());
  document.getElementById('login-email').value = 'sss@gmail.com';
  document.getElementById('login-password').value = '123456';
  fEventLogin();
  const btnLogin = document.getElementById('login-button');
  btnLogin.click();

  it('debería ser una función', () => {
    expect(typeof fEventLogin).toBe('function');
  });

  it('deberias loguearte con el correo y contraseña que escribes', () => {
    expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe(document.getElementById('login-email').value);
    expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe(document.getElementById('login-password').value);
  });

  it('deberias cambiar a ruta home', (done) => {
    expect(btnLogin instanceof HTMLElement).toBe(true);
    const changeRoute = () => {
      expect(window.location.hash).toBe('#/home');
      window.removeEventListener('hashchange', changeRoute);
      done();
    };
    window.addEventListener('hashchange', changeRoute);
  });
});

describe('fEventLogin funciona correctamente', () => {
  beforeEach(() => signInWithEmailAndPassword.mockClear());
  document.body.appendChild(loginTemplate());

  it('debería aparecer error cuando no hay un usuario registrado', (done) => {
    signInWithEmailAndPassword.mockRejectedValue({ code: 'auth/user-not-found' });
    fEventLogin();
    const btnLogin = document.getElementById('login-button');
    btnLogin.click();
    setTimeout(() => {
      expect(document.querySelector('.login-error').innerHTML).toBe('No existe ningún usuario registrado con este email.');
      done();
    });
  });

  it('debería aparecer error cuando hay un email en uso', (done) => {
    signInWithEmailAndPassword.mockRejectedValue({ code: 'auth/invalid-email' });
    fEventLogin();
    const btnLogin = document.getElementById('login-button');
    btnLogin.click();
    setTimeout(() => {
      expect(document.querySelector('.login-error').innerHTML).toBe('Proporcione una dirección de correo válida.');
      done();
    });
  });

  it('debería aparecer error cuando no se ingresa contraseña', (done) => {
    signInWithEmailAndPassword.mockRejectedValue({ code: 'auth/internal-error' });
    fEventLogin();
    const btnLogin = document.getElementById('login-button');
    btnLogin.click();
    setTimeout(() => {
      expect(document.querySelector('.login-error').innerHTML).toBe('El ingreso de contraseña es obligatorio.');
      done();
    });
  });

  it('debería aparecer error cuando ingresa contraseña menor a 6 dígitos', (done) => {
    signInWithEmailAndPassword.mockRejectedValue({ code: 'auth/wrong-password' });
    fEventLogin();
    const btnLogin = document.getElementById('login-button');
    btnLogin.click();
    setTimeout(() => {
      expect(document.querySelector('.login-error').innerHTML).toBe('La contraseña ingresada es incorrecta.');
      done();
    });
  });

  it('debería aparecer error', (done) => {
    signInWithEmailAndPassword.mockRejectedValue({ code: 'xxxx' });
    fEventLogin();
    const btnLogin = document.getElementById('login-button');
    btnLogin.click();
    setTimeout(() => {
      expect(document.querySelector('.login-error').innerHTML).toBe('Por favor vuelve a intentarlo.');
      done();
    });
  });
});

// /* **************** LOGIN DE USUARIO - GOOGLE ************************ */
describe('fGoogleSignIn', () => {
  // document.body.appendChild(loginTemplate());
  fGoogleSignIn();
  const btnLoginGoogle = document.getElementById('button-google');
  // btnLoginGoogle.click();

  it('debería ser una función', () => {
    expect(typeof fGoogleSignIn).toBe('function');
    expect(btnLoginGoogle instanceof HTMLElement).toBe(true);
  });

  it('deberias cambiar a ruta home', (done) => {
    btnLoginGoogle.click();
    const changeRoute = () => {
      expect(window.location.hash).toBe('#/home');
      window.removeEventListener('hashchange', changeRoute);
      done();
    };
    window.addEventListener('hashchange', changeRoute);
  });
});
