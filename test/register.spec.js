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
/* eslint-disable max-len */
// /* **************** REGISTRO DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
describe('fEventRegister funciona correctamente', () => {
  document.body.appendChild(registerTemplate());
  it('debería ser una función', () => {
    expect(typeof fEventRegister).toBe('function');
    expect(typeof registerTemplate).toBe('function');
  });

  // expect(errorRegister.innerHTML).toBe('Proporcione una dirección de correo válida.');
  // test('debería aparecer error cuando los datos son vacios', () => {
  //   const btnRegister = document.getElementById('register-button');
  //   // const errorRegister = document.getElementById('register-error');
  //   expect(btnRegister instanceof HTMLElement).toBe(true);
  //   document.getElementById('user-email').value = '';
  //   document.getElementById('user-password').value = '';
  //   fEventRegister();
  //   btnRegister.click();
  //   const errorMessage = document.querySelector('.register-error');
  //   const email = '';
  //   const password = '';
  //   eventRegisterFirebase(email, password)
  //     .catch(() => {
  //       expect(errorMessage.innerHTML).toBe('Usuario o contraseña no válido2');
  //     });
  // console.log(eventRegisterFirebase(email, password));
  // it('Muestra el error ', () => {
  //   const btnRegister = document.getElementById('register-button');
  //   createUserWithEmailAndPassword.mockImplementationOnce((email, password) => {
  //     expect(email).toBe('x');
  //     expect(password).toBe('x');
  //     return Promise.reject(new Error('Proporcione una dirección de correo válida.'));
  //   });
  //   document.getElementById('user-email').value = 'x';
  //   document.getElementById('user-password').value = 'x';
  //   fEventRegister();
  //   btnRegister.click();
  // });

  // test('login (ingreso) para usuario contraseña incorrecta', async () => {
  //   // eventLogin.mockImplementationOnce(() => Promise.reject({ code: 'code' }));
  //   // eslint-disable-next-line prefer-promise-reject-errors
  //   createUserWithEmailAndPassword.mockImplementation(() => Promise.reject({ code: 'xxx' }));
  //   await expect(eventRegisterFirebase()).resolves.toBe('user is loged');
  // });
  //   // expect(errorMessage.innerHTML).toBe('Email en uso, intenta iniciar sesión.');
  // });
});

//   it('deberias registrarte con el correo y contraseña que escribes', () => {
//     expect(eventRegister.mock.calls[0][0]).toBe(document.getElementById('user-email').value);
//     expect(eventRegister.mock.calls[0][1]).toBe(document.getElementById('user-password').value);
//   });
//   test('registro para usuario nuevo', async () => {
//     await expect(eventRegisterGlobal()).resolves.toBe('usuario registrado exitosamente');
//   });
// });

describe('eventRegisterGlobalError', () => {
  // document.body.appendChild(registerTemplate());
  // console.log(document.getElementById('login-email').value);
  // console.log(eventLogin.mock.calls[0][1]);
  const email = '';
  const password = '';
  const btnRegister = document.getElementById('register-button');
  test('login (ingreso) para usuario registrado', async () => {
    document.getElementById('user-email').value = '';
    document.getElementById('user-password').value = '';
    // console.log(eventLogin.mock.calls[0][1]);
    fEventRegister();
    btnRegister.click();
    createUserWithEmailAndPassword.mockImplementationOnce(() => {
      expect(email).toBe('');
      expect(password).toBe('');
      return Promise.reject(new Error('Proporcione una dirección de correo válida'));
    });
    // fEventRegister();

    // console.log(eventRegisterFirebase(email, password));
    // const received = eventRegisterFirebase(email, password);
    // const string = JSON.stringify(received);
    // await expect(string).rejects.toMatch({});
    await expect(eventRegisterFirebase(email, password)).rejects.toMatch({ error: 'f' });
    // setTimeout(() => {
    //   // expect(eventRegisterFirebase('', '')).resolves.toBe('error');
    //   expect(eventRegisterFirebase('', '')).rejects.toMatch('error');
    //   done();
    // }, 7000);
  });
});

// });
