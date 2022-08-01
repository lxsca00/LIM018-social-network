/* eslint-disable import/named */
import {
  fEventLogin,
  fEventLogout,
  fEventRegister,
  fSharePost,
  editProfile,
  fGoogleSignIn,
  fFacebookSignIn,
  inicioPage,
} from '../funcionesDom.js';
import { components } from '../view/index.js';

// eslint-disable-next-line consistent-return
const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/':
    { container.appendChild(components.inicio());
      document.getElementById('header').style.visibility = 'hidden';
      return inicioPage(); }
    case '#/principal':
    { container.appendChild(components.home());
      return fSharePost(); }
    case '#/registro':
    { container.appendChild(components.register());
      // addCountries();
      return fEventRegister(); }
    case '#/login':
    { container.appendChild(components.login());
      fGoogleSignIn();
      fFacebookSignIn();
      return fEventLogin(); }
    case '#/profile':
    { container.appendChild(components.profile());
      return editProfile(); }
    case '#/cerrarSesion':
    { return fEventLogout(); }
    default:
      break;
  }
  // console.log(route);
};

export { changeView };
