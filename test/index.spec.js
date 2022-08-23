/**
 * @jest-environment jsdom
 */
/* eslint-disable max-len */

import {
  obs,
} from '../src/lib/index.js';

import {
// signInWithPopup,
// onAuthStateChanged,
} from '../src/lib/firebase.js';

jest.mock('../src/lib/firebase.js');

// /* **************** LOGIN DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
describe(' obs', () => {
  document.body.innerHTML = `
    <header id="header" visibility="hidden">
    <div class="menu-logo">
      <img src="https://i.pinimg.com/originals/54/cc/e0/54cce0449cfd4414fdc19b068a97e00a.png" alt="" />
      <a href="#/home"> PopcornZone </a> <!-- Home -->
    </div>
    </header>`;

  it('debería aparecer y desaparecer header', () => {
    const header = document.getElementById('header');
    obs();
    expect(header.style.visibility).toBe('visible');
  });
});
