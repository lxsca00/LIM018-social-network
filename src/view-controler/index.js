import {
  // fEventLogin,
  // fEventLogout,
  // fEventRegister,
  // fSharePost,
  // fGoogleSignIn,
  closeModal,
} from '../funcionesDom.js';
import { components } from '../view/index.js';
import { activeUserProfile, editProfile } from '../view/profile.js';
import { fEventLogin, fGoogleSignIn } from '../view/login.js';
import { fEventRegister } from '../view/register.js';
import { fSharePost } from '../view/home.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/':
    { container.appendChild(components.inicio());
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
    default: {
      container.appendChild(components.error());
      break;
    }
  }
};

export { changeView };
