/* /**
 * @jest-environment jsdom
 */

import { obs } from '../src/lib/index.js';

import {
  auth,
} from '../src/lib/firebase.js';

jest.mock('../src/lib/firebase.js');

// /* **************** TESTEANDO EL OBSERVADOR :  ************************ */
describe(' obs', () => {
  document.body.innerHTML = `
    <header id="header">
    <div class="menu-logo">
      <img src="https://i.pinimg.com/originals/54/cc/e0/54cce0449cfd4414fdc19b068a97e00a.png" alt="" />
      <a href="#/home"> PopcornZone </a> <!-- Home -->
    </div>
    </header>`;

  it('debería aparecer', () => {
    const header = document.getElementById('header');
    document.getElementById('header').style.visibility = 'hidden';
    obs();
    expect(header.style.visibility).toBe('visible');
    // }
  });
});
describe(' obs 2', () => {
  document.body.innerHTML = `
    <header id="header">
    <div class="menu-logo">
      <img src="https://i.pinimg.com/originals/54/cc/e0/54cce0449cfd4414fdc19b068a97e00a.png" alt="" />
      <a href="#/home"> PopcornZone </a> <!-- Home -->
    </div>
    </header>`;

  it('debería desaparecer el header', () => {
    const header = document.getElementById('header');
    document.getElementById('header').style.visibility = 'visible';
    auth.currentUser = null;
    obs();
    expect(header.style.visibility).toBe('hidden');
    // }
  });
});
