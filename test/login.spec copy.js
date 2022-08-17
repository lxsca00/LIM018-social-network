/**
 * @jest-environment jsdom
 */
/* eslint-disable max-len */
import {
  loginTemplate,
  fEventLogin,
} from '../src/view/login.js';

import {
  signInWithEmailAndPassword,
} from '../src/lib/firebase.js';

jest.mock('../src/lib/firebase.js');

// /* **************** LOGIN DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
describe('fEventRegister', () => {
  document.body.appendChild(loginTemplate());
  document.getElementById('user-email').value = 'aaa@gmail.com';
  document.getElementById('user-password').value = '123456';
  fEventLogin();
  const btnRegister = document.getElementById('register-button');
  btnRegister.click();

  it('debería ser una función', () => {
    expect(typeof fEventRegister).toBe('function');
  });
  it('deberias loguearte con el correo y contraseña que escribes', () => {
    expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe(document.getElementById('user-email').value);
    expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe(document.getElementById('user-password').value);
  });
  // test('login (ingreso) para usuario registrado', () => {
  //   fEventRegister();
  //   btnRegister.click();
  //   setTimeout(() => expect(eventRegisterFirebase('mariaperez123@gmail.com', '123456')).resolves.toBe('user is loged'));
  // });
  it('deberias cambiar a ruta login', (done) => {
    expect(btnRegister instanceof HTMLElement).toBe(true);
    const changeRoute = () => {
      expect(window.location.hash).toBe('#/login');
      window.removeEventListener('hashchange', changeRoute);
      done();
    };
    window.addEventListener('hashchange', changeRoute);
    // btnRegister.click();
  });
});

describe('fEventRegister funciona correctamente', () => {
  beforeEach(() => signInWithEmailAndPassword.mockClear());
  document.body.appendChild(loginTemplate());
  // it('debería ser una función', () => {
  //   expect(typeof fEventRegister).toBe('function');
  //   expect(typeof registerTemplate).toBe('function');
  // });

  it('debería aparecer error cuando los datos son vacios', (done) => {
    signInWithEmailAndPassword.mockRejectedValue({ code: 'auth/invalid-email' });
    fEventLogin();
    const btnRegister = document.getElementById('register-button');
    btnRegister.click();
    setTimeout(() => {
      expect(document.getElementById('register-error-modal').innerHTML).toBe('Proporcione una dirección de correo válida.');
      done();
    });
  });

  it('debería aparecer error cuando hay un email en uso', (done) => {
    signInWithEmailAndPassword.mockRejectedValue({ code: 'auth/email-already-in-use' });
    fEventLogin();
    const btnRegister = document.getElementById('register-button');
    btnRegister.click();
    setTimeout(() => {
      expect(document.getElementById('register-error-modal').innerHTML).toBe('Email en uso, intenta iniciar sesión.');
      done();
    });
  });

  it('debería aparecer error cuando no se ingresa contraseña', (done) => {
    signInWithEmailAndPassword.mockRejectedValue({ code: 'auth/internal-error' });
    fEventLogin();
    const btnRegister = document.getElementById('register-button');
    btnRegister.click();
    setTimeout(() => {
      expect(document.getElementById('register-error-modal').innerHTML).toBe('El ingreso de contraseña es obligatorio.');
      done();
    });
  });

  it('debería aparecer error cuando ingresa contraseña menor a 6 dígitos', (done) => {
    signInWithEmailAndPassword.mockRejectedValue({ code: 'auth/weak-password' });
    fEventLogin();
    const btnRegister = document.getElementById('register-button');
    btnRegister.click();
    setTimeout(() => {
      expect(document.getElementById('register-error-modal').innerHTML).toBe('Tu contraseña debe tener al menos 6 caracteres.');
      done();
    });
  });

  it('debería aparecer error', (done) => {
    signInWithEmailAndPassword.mockRejectedValue({ code: 'xxxx' });
    fEventLogin();
    const btnRegister = document.getElementById('register-button');
    btnRegister.click();
    setTimeout(() => {
      expect(document.getElementById('register-error-modal').innerHTML).toBe('Vuelve a intentarlo.');
      done();
    });
  });
});
