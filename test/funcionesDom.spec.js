/**
 * @jest-environment jsdom
 */

/* eslint-disable max-len */

import login from '../src/view/login.js';

import {
  fEventLogin,
  eventLoginGlobal,
} from '../src/funcionesDom';
// import { eventLogin } from '../src/lib/index.js';

import {
  eventLogin,
} from '../src/lib/index.js';

jest.mock('../src/lib/index.js');

// FUNCTION LOGIN
describe('eventLogin1', () => {
  document.body.appendChild(login());
  document.getElementById('login-email').value = 'aaa@gmail.com';
  document.getElementById('login-password').value = '123456';
  eventLoginGlobal();
  // console.log(eventLogin.mock.calls[0][0]);
  // console.log(eventLogin.mock.calls[0][1]);
  it('debería ser una función', () => {
    expect(typeof eventLoginGlobal).toBe('function');
  });
  it('deberias loguearte con el correo y contraseña que escribes', () => {
    expect(eventLogin.mock.calls[0][0]).toBe(document.getElementById('login-email').value);
    expect(eventLogin.mock.calls[0][1]).toBe(document.getElementById('login-password').value);
  });
  test('login (ingreso) para usuario registrado', async () => {
    await expect(eventLoginGlobal()).resolves.toBe('user is loged');
  });
  // test('login (ingreso) para usuario no registrado', async () => {
  //   // const result = eventLogin1();
  //   await expect(eventLogin1(new Error())).rejects.toThrow(new Error());
  // });
  // test('login (ingreso) para usuario registrado', () => expect(eventLogin1()).resolves.toBe('user is loged'));
});

describe('eventLoginGlobalError', () => {
  document.body.appendChild(login());
  // console.log(document.getElementById('login-email').value);
  // console.log(eventLogin.mock.calls[0][1]);

  test('login (ingreso) para usuario registrado', (done) => {
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    // console.log(eventLogin.mock.calls[0][1]);
    eventLoginGlobal();
    // eslint-disable-next-line prefer-promise-reject-errors
    eventLogin.mockImplementationOnce(() => Promise.reject({ code: 'code' }));
    setTimeout(() => {
      // eslint-disable-next-line jest/valid-expect
      expect(eventLoginGlobal()).resolves.toBe('error');
      // eslint-disable-next-line jest/valid-expect
      // expect(eventLoginGlobal()).rejects.toMatch('error');
      done();
    }, 200);
  });
});

describe('feventLogin', () => {
  // console.log(eventLogin.mock.calls[0][0]);
  // console.log(eventLogin.mock.calls[0][1]);
  it('debería ser una función', () => {
    console.log(typeof feventLogin);
    expect(typeof fEventLogin).toBe('function');
  });
});
