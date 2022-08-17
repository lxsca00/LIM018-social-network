/**
 * @jest-environment jsdom
 */
/* eslint-disable max-len */
import {
  registerTemplate,
  fEventRegister,
} from '../src/view/register.js';

import {
  createUserWithEmailAndPassword,
} from '../src/lib/firebase.js';

jest.mock('../src/lib/firebase.js');

// /* **************** REGISTRO DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
describe('fEventRegister', () => {
  document.body.appendChild(registerTemplate());
  document.getElementById('user-email').value = 'aaa@gmail.com';
  document.getElementById('user-password').value = '123456';
  fEventRegister();
  const btnRegister = document.getElementById('register-button');
  btnRegister.click();

  it('debería ser una función', () => {
    expect(typeof fEventRegister).toBe('function');
  });
  it('deberias loguearte con el correo y contraseña que escribes', () => {
    expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe(document.getElementById('user-email').value);
    expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe(document.getElementById('user-password').value);
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
  beforeEach(() => createUserWithEmailAndPassword.mockClear());
  document.body.appendChild(registerTemplate());
  // it('debería ser una función', () => {
  //   expect(typeof fEventRegister).toBe('function');
  //   expect(typeof registerTemplate).toBe('function');
  // });

  it('debería aparecer error cuando los datos son vacios', (done) => {
    createUserWithEmailAndPassword.mockRejectedValue({ code: 'auth/invalid-email' });
    fEventRegister();
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
    const btnRegister = document.getElementById('register-button');
    btnRegister.click();
    setTimeout(() => {
      expect(document.getElementById('register-error-modal').innerHTML).toBe('Email en uso, intenta iniciar sesión.');
      done();
    });
  });

  it('debería aparecer error cuando no se ingresa contraseña', (done) => {
    createUserWithEmailAndPassword.mockRejectedValue({ code: 'auth/internal-error' });
    fEventRegister();
    const btnRegister = document.getElementById('register-button');
    btnRegister.click();
    setTimeout(() => {
      expect(document.getElementById('register-error-modal').innerHTML).toBe('El ingreso de contraseña es obligatorio.');
      done();
    });
  });

  it('debería aparecer error cuando ingresa contraseña menor a 6 dígitos', (done) => {
    createUserWithEmailAndPassword.mockRejectedValue({ code: 'auth/weak-password' });
    fEventRegister();
    const btnRegister = document.getElementById('register-button');
    btnRegister.click();
    setTimeout(() => {
      expect(document.getElementById('register-error-modal').innerHTML).toBe('Tu contraseña debe tener al menos 6 caracteres.');
      done();
    });
  });

  it('debería aparecer error', (done) => {
    createUserWithEmailAndPassword.mockRejectedValue({ code: 'xxxx' });
    fEventRegister();
    const btnRegister = document.getElementById('register-button');
    btnRegister.click();
    setTimeout(() => {
      expect(document.getElementById('register-error-modal').innerHTML).toBe('Vuelve a intentarlo.');
      done();
    });
  });
});

// describe('eventRegisterGlobalError', () => {
//   beforeEach(() => createUserWithEmailAndPassword.mockClear());
//   const btnRegister = document.getElementById('register-button');
//   test('login (ingreso) para usuario registrado', async () => {
//     // console.log(eventLogin.mock.calls[0][1]);
//     document.getElementById('user-email').value = '';
//     document.getElementById('user-password').value = '';
//     fEventRegister();
//     btnRegister.click();
//     createUserWithEmailAndPassword.mockImplementationOnce(() => {
//       console.log(createUserWithEmailAndPassword.mock.calls);
//       expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe('');
//       expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('');
//       // eslint-disable-next-line prefer-promise-reject-errors
//       return Promise.reject('Proporcione una dirección de correo válida.');
//     });
//     await expect(eventRegisterFirebase('', '')).rejects.toMatch('Proporcione una dirección de correo válida.');
//   });
// });
