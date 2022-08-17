/**
 * @jest-environment jsdom
 */

import {
  registerTemplate,
  fEventRegister,
  // eventRegister,
} from '../src/view/register.js';

import {
  eventRegisterFirebase,
} from '../src/lib/index.js';

import {
  createUserWithEmailAndPassword,
} from '../src/lib/firebase.js';

jest.mock('../src/lib/firebase.js');

// /* **************** REGISTRO DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
describe('fEventRegister funciona correctamente', () => {
  beforeEach(() => createUserWithEmailAndPassword.mockClear());
  document.body.appendChild(registerTemplate());
  // it('debería ser una función', () => {
  //   expect(typeof fEventRegister).toBe('function');
  //   expect(typeof registerTemplate).toBe('function');
  // });

  it('debería aparecer error cuando los datos son vacios', (done) => {
    createUserWithEmailAndPassword.mockRejectedValue({ code: 'auth/invalid-email' });
    fEventRegister();
    document.getElementById('user-email').value = '';
    document.getElementById('user-password').value = '';
    const btnRegister = document.getElementById('register-button');
    btnRegister.click();
    setTimeout(() => {
      expect(document.getElementById('register-error-modal').innerHTML).toBe('Proporcione una dirección de correo válida.');
      done();
    });
  });
  it('debería aparecer error cuando hay un email en uso', (done) => {
    createUserWithEmailAndPassword.mockRejectedValue({ code: 'auth/email-already-in-use' });
    fEventRegister();
    document.getElementById('user-email').value = 'sss@gmail.com';
    document.getElementById('user-password').value = '123456';
    const btnRegister = document.getElementById('register-button');
    btnRegister.click();
    setTimeout(() => {
      expect(document.getElementById('register-error-modal').innerHTML).toBe('Email en uso, intenta iniciar sesión.');
      done();
    });
  });
  it('debería aparecer error cuando hay un email en uso', (done) => {
    createUserWithEmailAndPassword.mockRejectedValue({ code: 'auth/email-already-in-use' });
    fEventRegister();
    document.getElementById('user-email').value = 'sss@gmail.com';
    document.getElementById('user-password').value = '123456';
    const btnRegister = document.getElementById('register-button');
    btnRegister.click();
    setTimeout(() => {
      expect(document.getElementById('register-error-modal').innerHTML).toBe('Email en uso, intenta iniciar sesión.');
      done();
    });
  });
});

describe('eventRegisterGlobalError', () => {
  beforeEach(() => createUserWithEmailAndPassword.mockClear());
  const btnRegister = document.getElementById('register-button');
  test('login (ingreso) para usuario registrado', async () => {
    // console.log(eventLogin.mock.calls[0][1]);
    document.getElementById('user-email').value = '';
    document.getElementById('user-password').value = '';
    fEventRegister();
    btnRegister.click();
    createUserWithEmailAndPassword.mockImplementationOnce(() => {
      console.log(createUserWithEmailAndPassword.mock.calls);
      expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe('');
      expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('');
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('Proporcione una dirección de correo válida.');
    });
    await expect(eventRegisterFirebase('', '')).rejects.toMatch('Proporcione una dirección de correo válida.');
  });
});
