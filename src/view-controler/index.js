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
  fChangePhoto,
  closeModal,
} from '../funcionesDom.js';
import { components } from '../view/index.js';

// eslint-disable-next-line consistent-return
const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/':
    { container.appendChild(components.inicio());
      return inicioPage(); }
    case '#/principal':
    { container.appendChild(components.home());
      return fSharePost(); }
    case '#/registro':
    { container.appendChild(components.register());
      fEventRegister();
      return closeModal(); }
    case '#/login':
    { container.appendChild(components.login());
      fGoogleSignIn();
      fFacebookSignIn();
      fEventLogin();
      return closeModal(); }
    case '#/profile':
    { container.appendChild(components.profile());
      fChangePhoto();
      return editProfile(); }
    default:
      break;
  }
  // console.log(route);
};

export { changeView };
