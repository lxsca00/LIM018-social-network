/* eslint-disable import/named */
import {
  fEventLogin,
  // fEventLogout,
  fEventRegister,
  fSharePost,
  editProfile,
  fGoogleSignIn,
  fFacebookSignIn,
  inicioPage,
  // fChangePhoto,
  closeModal,
} from '../funcionesDom.js';
import { userActivo } from '../lib/index.js';
import { components } from '../view/index.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/':
    { container.appendChild(components.inicio());
      inicioPage();
      break; }
    case '#/principal':
    { container.appendChild(components.home());
      userActivo();
      fSharePost();
      break; }
    case '#/registro':
    { container.appendChild(components.register());
      fEventRegister();
      closeModal();
      break; }
    case '#/login':
    { container.appendChild(components.login());
      fGoogleSignIn();
      fFacebookSignIn();
      fEventLogin();
      closeModal();
      break; }
    case '#/profile':
    { container.appendChild(components.profile());
      // fChangePhoto();
      editProfile();
      break; }
    default:
      break;
  }
};

export { changeView };
