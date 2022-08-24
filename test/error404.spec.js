/**
 * @jest-environment jsdom
 */

import { errorTemplate } from '../src/view/404error.js';

describe('error404', () => {
  document.body.appendChild(errorTemplate());

  it('Debe aparecer una imagen de error para ruta no existente', () => {
    const imgError = document.querySelector('img');
    expect(imgError instanceof HTMLElement).toBe(true);
    expect(imgError.hasAttribute('src')).toBe(true);
  });
});
