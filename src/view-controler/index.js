import {
  closeModal,
  flogout,
} from '../funcionesDom.js';
import { components } from '../view/index.js';
import { activeUserProfile, editProfile } from '../view/profile.js';
import { fEventLogin, fGoogleSignIn } from '../view/login.js';
import { fEventRegister } from '../view/register.js';
import { fSharePost, onGetPosts, activeUserHome } from '../view/home.js';
import { auth } from '../lib/firebase.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  const user = auth.currentUser;
  container.innerHTML = '';
  switch (route) {
    case '#/': {
      if (user) {
        window.location.hash = '#/home';
        break;
      }
      container.appendChild(components.inicio());
      break; }
    case '#/home': {
      container.appendChild(components.home());
      activeUserHome();
      onGetPosts();
      fSharePost();
      flogout();
      break; }
    case '#/registro': {
      container.appendChild(components.register());
      fEventRegister();
      closeModal();
      break; }
    case '#/login': {
      container.appendChild(components.login());
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
