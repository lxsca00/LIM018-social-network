/**
 * @jest-environment jsdom
 */

import {
  editProfile, profileTemplate, userImg,
} from '../src/view/profile.js';

jest.mock('../src/lib/firebase.js');

describe('profile', () => {
  document.body.appendChild(profileTemplate());
  const saveChanges = document.querySelector('#save-changes');
  const buttonEdit = document.querySelector('#editProfile');

  it('Debe mostrar la foto de perfil del usuario logeado con Google', () => {
    expect(userImg('https://lh3.googleusercontent.com/a/AItbvmn72LYQ0Zp37_jVQ7TKfGSS7U70b0APdDt0j2r-=s96-c')).toBe('https://lh3.googleusercontent.com/a/AItbvmn72LYQ0Zp37_jVQ7TKfGSS7U70b0APdDt0j2r-=s96-c');
  });

  it('Debe mostrar la foto predeterminada si el usuario no ha designado una', () => {
    expect(userImg('')).toBe('images/user.png');
  });

  it('Debe existir el boton save-changes en el modal', () => {
    editProfile();
    expect(saveChanges instanceof HTMLElement).toBe(true);
    const changeDescription = document.querySelector('#change-description');
    changeDescription.value = 'Aquí va tu descripción';
    saveChanges.click();
    // changeDescription.textContent = '¡Hola!';
    // const userDescription = document.querySelector('.user-description');
    expect(changeDescription.textContent).toBe('');
  });

  it('Deben existir las opciones de paises al hacer click en el boton para mostrar modal', () => {
    buttonEdit.click();
    const options = document.querySelector('option');
    expect(options instanceof HTMLElement).toBe(true);
  });

  it('Las opciones ya no deben existir al hacer click en el botón de cerrar modal', () => {
    const buttonClose = document.querySelector('#close');
    buttonClose.click();
    const options = document.querySelector('option');
    expect(options).toBeNull();
  });
});
/* it('top-user-info tiene x hijos', () => {
    const topUserInfo = document.querySelector('.top-user-info');
    expect(topUserInfo.children).toHaveLength(4);
  }); */
