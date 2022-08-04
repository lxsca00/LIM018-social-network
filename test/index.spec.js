/**
 * @jest-environment jsdom
 */

import login from '../src/view/login.js';
// import { fEventLogin } from '../src/funcionesDom';
import { eventLogin } from '../src/lib/index.js';

jest.mock('../src/lib/index.js');

// login
describe('login', () => {
  it('debería ser una función', () => {
    expect(typeof login).toBe('function');
  });
  it('click para login', () => {
    document.body.appendChild(login());
    document.getElementById('login-email').value = 'sss@gmail.com';
    document.getElementById('login-password').value = '123456';
    const btnLogin = document.getElementById('login-button');
    expect(btnLogin instanceof HTMLElement).toBe(true);
    // console.log(fEventLogin());
    console.log(eventLogin());
    expect(document.body).toMatchSnapshot();
  });
});
