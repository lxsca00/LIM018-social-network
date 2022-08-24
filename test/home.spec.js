/**
 * @jest-environment jsdom
 */
/* eslint-disable max-len */

import {
  homeTemplate,
  closeModalEdit,
  closeModalDelete,
  fSharePost,
  userImg,
  // deletePosts,
} from '../src/view/home.js';

import {
// createUserWithEmailAndPassword,
} from '../src/lib/firebase.js';

jest.mock('../src/lib/firebase.js');

describe('activeUser', () => {
  document.body.appendChild(homeTemplate());

  it('Debe mostrar la foto de perfil del usuario logeado con Google', () => {
    expect(userImg('https://lh3.googleusercontent.com/a/AItbvmn72LYQ0Zp37_jVQ7TKfGSS7U70b0APdDt0j2r-=s96-c')).toBe('https://lh3.googleusercontent.com/a/AItbvmn72LYQ0Zp37_jVQ7TKfGSS7U70b0APdDt0j2r-=s96-c');
  });

  it('Debe mostrar la foto predeterminada si el usuario no ha designado una', () => {
    expect(userImg('')).toBe('images/user.png');
  });
});

describe('closeModals', () => {
  document.body.appendChild(homeTemplate());

  it('closeModalEdit', () => {
    closeModalEdit();
    const modalEdit2 = document.querySelector('.close-modal');
    expect(modalEdit2 instanceof HTMLElement).toBe(true);
    const modalBackground = document.querySelector('.background-modal-edit');
    modalEdit2.click();
    expect(modalBackground.style.visibility).toBe('hidden');
  });

  it('closeModalDelete', () => {
    document.body.innerHTML = `
    <div class="background-modal-delete">
    <div class="modal-delete">
      <p> ¿Estas seguro de borrar este post? <img src="https://emoji.slack-edge.com/T0NNB6T0R/sad_parrot/63bb67f63f6b6d9d.gif"> </p>
      <div class="btns-delete">
        <button class="close-modalDelete btnDelete" id='deleteYes'> SI </button>
        <button class="close-modalDelete btnDelete" id='deleteNo'> NO </button>
      </div>
    </div>
  <div>`;
    closeModalDelete();
    const modalDelete = document.querySelector('.close-modalDelete');
    const modalBackground = document.querySelector('.background-modal-delete');
    modalDelete.click();
    expect(modalBackground.style.visibility).toBe('hidden');
  });
});

describe('sharePosts', () => {
  it('fSharePost', () => {
    document.body.appendChild(homeTemplate());
    fSharePost();
    document.querySelector('#comment').value = 'comentario 1';
    const formPublication1 = document.getElementById('post-button-form');
    formPublication1.click();
    expect(document.querySelector('#comment').value).toBe(' ');
  });
});

// describe('deletePosts', () => {
//   it('deletePosts', () => {
//     document.body.innerHTML = `
//     <button title="Delete post" class="delete-button" data-id='1234'> Eliminar </button>
//     <div class="background-modal-delete">
//     <div class="modal-delete">
//       <p> ¿Estas seguro de borrar este post? <img src="https://emoji.slack-edge.com/T0NNB6T0R/sad_parrot/63bb67f63f6b6d9d.gif"> </p>
//       <div class="btns-delete">
//         <button class="close-modalDelete btnDelete" id='deleteYes'> SI </button>
//         <button class="close-modalDelete btnDelete" id='deleteNo'> NO </button>
//       </div>
//     </div>
//   </div>`;
//     deletePosts();
//     const btnsDelete = document.querySelectorAll('.delete-button');
//     btnsDelete.click();
//     const modalError = document.querySelector('.background-modal-delete');
//     expect(modalError.style.visibility).toBe('visible');
//   });
// });
