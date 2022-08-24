/**
 * @jest-environment jsdom
 */

import inicio from '../src/view/inicio.js';

describe('inicio', () => {
  let buttonLogin;
  let buttonRegister;

  beforeEach(() => {
    document.body.appendChild(inicio());
    buttonLogin = document.getElementById('welcome-login-button');
    buttonRegister = document.getElementById('welcome-register-button');
  });
  it('Existe el botón Login en el componente Inicio', () => {
    expect(buttonLogin instanceof HTMLElement).toBe(true);
  });
  it('Existe el botón Register en el componente Inicio', () => {
    expect(buttonRegister instanceof HTMLElement).toBe(true);
  });
});
