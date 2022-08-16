/**
 * @jest-environment jsdom
 */

/* eslint-disable max-len */

import login from '../src/view/login.js';
// import register from '../src/view/register.js';
import {
  // fEventLogin,
  eventLoginGlobal,
  fEventLogin,
//  eventRegisterGlobal,
  // fEventRegister,
} from '../src/funcionesDom';
import {
  eventLogin,
//   eventRegister,
  // eventSetDoc,
} from '../src/lib/index.js';

jest.mock('../src/lib/index.js');

/* ************** AUTENTIFICACIÓN DE USUARIO - LOGIN CON CONTRASEÑA **************** */
describe('eventLoginGlobal', () => {
  document.body.innerHTML = `
  <a href="#/home" id="home-li">Home</a>
  <a href="#/profile" id="perfil-li">Ver tu perfil</a>
  <a href="#/profile" id="registro-li">Ver tu perfil</a>
  <a href="#/cerrarSesion" id="logout"> Cerrar sesión</a>`;
  document.body.appendChild(login());
  fEventLogin();
  document.getElementById('login-email').value = 'vane@gmail.com';
  document.getElementById('login-password').value = '123456';
  document.getElementById('login-button').click();
  // eventLoginGlobal();

  it('debería ser una función', () => {
    expect(typeof eventLoginGlobal).toBe('function');
  });

  it('deberias loguearte con el correo y contraseña que escribes', () => {
    expect(eventLogin.mock.calls[0][0]).toBe(document.getElementById('login-email').value);
    expect(eventLogin.mock.calls[0][1]).toBe(document.getElementById('login-password').value);
    // eventLogin.mockClear();
  });
  test('login (ingreso) para usuario registrado', async () => {
    await expect(eventLoginGlobal()).resolves.toBe('user is loged');
  });

  test('login (ingreso) para usuario sin registrar', async () => {
    document.getElementById('login-email').value = 'mariaperez@gmail.com';
    document.getElementById('login-password').value = '123456';
    // eslint-disable-next-line prefer-promise-reject-errors
    eventLogin.mockImplementation(() => Promise.reject({ code: 'xxx' }));
    await expect(eventLogin()).rejects.toMatch('No existe ningún usuario registrado con este email.');
  });

  test('login (ingreso) para usuario correo invalido', async () => {
    // eslint-disable-next-line prefer-promise-reject-errors
    eventLogin.mockImplementation(() => Promise.reject({ code: 'xxx' }));
    await expect(eventLoginGlobal()).rejects.toMatch('Proporcione una dirección de correo válida.');
  });

  // test('login (ingreso) para usuario contraseña incorrecta', async () => {
  //   // eventLogin.mockImplementationOnce(() => Promise.reject({ code: 'code' }));
  //   // eslint-disable-next-line prefer-promise-reject-errors
  //   eventLogin.mockImplementation(() => Promise.reject({ code: 'xxx' }));
  //   await expect(eventLoginGlobal()).resolves.toBe('user is loged');
  // });
});

// describe('eventLoginGlobalError', () => {
//   // beforeEach(() => eventLogin.mockClear());
//   document.getElementById('login-email').value = '';
//   document.getElementById('login-password').value = 'xxxxx';
//   eventLoginGlobal();
//   console.log(eventLogin.mock.calls);
//   // eslint-disable-next-line prefer-promise-reject-errors
//   // eventLogin.mockImplementationOnce(() => Promise.reject({ code: 'code' }));
//   console.log(eventLogin('xx', '123456'));
//   it('login (ingreso) para usuario registrado', () => eventLogin('xx', '123456')
//     .catch((errorCode) => {
//       expect(errorCode).toBe('auth/invalid-em');
//       console.log(eventLogin('xx', '123456'));
//     }));
// });

// describe('eventLoginGlobalError', () => {
//   beforeEach(() => eventLogin.mockClear());
//   test('login (ingreso) para usuario registrado', (done) => {
//     document.getElementById('login-email').value = 'ff@gmail';
//     document.getElementById('login-password').value = '123';
//     console.log(eventLogin.mock.calls[0][0]);
//     eventLoginGlobal();
//     // eslint-disable-next-line prefer-promise-reject-errors
//     eventLogin.mockImplementationOnce(() => Promise.reject({ code: 'code' }));
//     setTimeout(() => {
//       // eslint-disable-next-line jest/valid-expect
//       expect(eventLoginGlobal()).resolves.toBe('error');
//       // expect(eventLoginGlobal()).rejects.toMatch('error');
//       done();
//     }, 200);
//   });
// });

// describe('feventLogin', () => {
//   // console.log(eventLogin.mock.calls[0][0]);
//   // console.log(eventLogin.mock.calls[0][1]);
//   it('debería ser una función', () => {
//     console.log(typeof feventLogin);
//     expect(typeof fEventLogin).toBe('function');
//   });
// });

// /* **************** REGISTRO DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
// describe('eventRegisterGlobal', () => {
//   document.body.appendChild(register());
//   document.getElementById('user-email').value = 'mariaChavez@gmail.com';
//   document.getElementById('user-password').value = '123456';
//   document.getElementById('user-name').value = 'maria';
//   document.getElementById('user-username').value = 'mary';
//   eventRegisterGlobal();
//   console.log(eventRegister.mock.calls);
//   console.log(eventRegister.mock.calls[0][1]);
//   it('debería ser una función', () => {
//     expect(typeof eventLoginGlobal).toBe('function');
//   });
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
// });

// // describe('feventLogin', () => {
// //   // console.log(eventLogin.mock.calls[0][0]);
// //   // console.log(eventLogin.mock.calls[0][1]);
// //   it('debería ser una función', () => {
// //     console.log(typeof feventLogin);
// //     expect(typeof fEventLogin).toBe('function');
// //   });
// // });