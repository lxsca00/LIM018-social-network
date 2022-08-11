import {
  fEventLogin,
  // fEventLogout,
  fEventRegister,
  fSharePost,
  editProfile,
  fGoogleSignIn,
  inicioPage,
  closeModal,
} from '../funcionesDom.js';
import { activeUserProfile } from '../lib/index.js';
import { components } from '../view/index.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/':
    { container.appendChild(components.inicio());
      inicioPage();
      break; }
    case '#/home':
    { container.appendChild(components.home());
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
      fEventLogin();
      closeModal();
      break; }
    case '#/profile':
    { container.appendChild(components.profile());
      activeUserProfile();
      editProfile();
      break; }
    default:
      break;
  }
};

export { changeView };
