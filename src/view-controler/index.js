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
} from '../main.js';
import { addCountries } from '../view/countries.js';
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
      addCountries();
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

// PARA CAMBIAR DE VISTA
const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);
