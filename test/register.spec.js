/**
 * @jest-environment jsdom
 */

import {
  registerTemplate,
  fEventRegister,
  eventRegister,
} from '../src/view/register.js';

import {
  eventRegisterFirebase,
} from '../src/lib/index.js';

jest.mock('../src/lib/firebase.js');
/* eslint-disable max-len */
// /* **************** REGISTRO DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
describe('fEventRegister funciona correctamente', () => {
  document.body.appendChild(registerTemplate());
  // document.getElementById('user-email').value = 'mariaChavez@gmail.com';
  // document.getElementById('user-password').value = '123456';
  // document.getElementById('user-name').value = 'maria';
  // fEventRegister();
  it('debería ser una función', () => {
    expect(typeof fEventRegister).toBe('function');
    expect(typeof registerTemplate).toBe('function');
    expect(typeof eventRegister).toBe('function');
  });
  // it('debería aparecer error cuando los datos son vacios', () => {
  //   const btnRegister = document.getElementById('register-button');
  //   // const errorRegister = document.getElementById('register-error');
  //   expect(btnRegister instanceof HTMLElement).toBe(true);
  //   fEventRegister();
  //   btnRegister.click();
  // eventRegister('', '', '', '', '', '');
  // eventRegisterFirebase(email, passworentRegister).
  // const errorRegister = document.getElementById('register-error');

  // expect(errorRegister.innerHTML).toBe('Proporcione una dirección de correo válida.');
  test('debería aparecer error cuando los datos son vacios', async () => {
    const btnRegister = document.getElementById('register-button');
    // const errorRegister = document.getElementById('register-error');
    expect(btnRegister instanceof HTMLElement).toBe(true);
    fEventRegister();
    btnRegister.click();
    await expect(eventRegisterFirebase('', '')).resolves.toBe('auth/internal-error');
  });
  // });

  //   it('deberias registrarte con el correo y contraseña que escribes', () => {
  //     expect(eventRegister.mock.calls[0][0]).toBe(document.getElementById('user-email').value);
  //     expect(eventRegister.mock.calls[0][1]).toBe(document.getElementById('user-password').value);
  //   });
  //   test('registro para usuario nuevo', async () => {
  //     await expect(eventRegisterGlobal()).resolves.toBe('usuario registrado exitosamente');
  //   });
  // });

// describe('eventRegisterGlobalError', () => {
//   document.body.appendChild(login());
//   // console.log(document.getElementById('login-email').value);
//   // console.log(eventLogin.mock.calls[0][1]);
//   test('login (ingreso) para usuario registrado', (done) => {
//     document.getElementById('login-email').value = '';
//     document.getElementById('login-password').value = '';
//     // console.log(eventLogin.mock.calls[0][1]);
//     eventLoginGlobal();
//     // eslint-disable-next-line prefer-promise-reject-errors
//     eventLogin.mockImplementationOnce(() => Promise.reject({ code: 'code' }));
//     setTimeout(() => {
//       // eslint-disable-next-line jest/valid-expect
//       expect(eventRegisterGlobal()).resolves.toBe('error');
//       // expect(eventLoginGlobal()).rejects.toMatch('error');
//       done();
//     }, 200);
//   });
});

// describe('feventLogin', () => {
//   // console.log(eventLogin.mock.calls[0][0]);
//   // console.log(eventLogin.mock.calls[0][1]);
//   it('debería ser una función', () => {
//     console.log(typeof feventLogin);
//     expect(typeof fEventLogin).toBe('function');
//   });
// });
