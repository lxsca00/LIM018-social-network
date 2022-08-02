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
import { addCountries } from '../view/countries.js';
import { components } from '../view/index.js';

// eslint-disable-next-line consistent-return
const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/':
    { container.appendChild(components.inicio());
      // document.getElementById('header').style.visibility = 'hidden';
      return inicioPage(); }
    case '#/principal':
    { container.appendChild(components.home());
      // document.getElementById('home-li').style.display = 'block';
      // document.getElementById('perfil-li').style.display = 'block';
      // document.getElementById('logout').style.display = 'block';
      // document.getElementById('registro-li').style.display = 'none';
      // document.getElementById('login').style.display = 'none';
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
      // document.getElementById('home-li').style.display = 'block';
      // document.getElementById('perfil-li').style.display = 'block';
      // document.getElementById('logout').style.display = 'block';
      // document.getElementById('registro-li').style.display = 'none';
      // document.getElementById('login').style.display = 'none';
      return editProfile(); }
    case '#/cerrarSesion':
    { fEventLogout();
      container.appendChild(components.login());
      // document.getElementById('home-li').style.display = 'none';
      // document.getElementById('perfil-li').style.display = 'none';
      // document.getElementById('logout').style.display = 'none';
      // document.getElementById('registro-li').style.display = 'block';
      // document.getElementById('login').style.display = 'block';
      fGoogleSignIn();
      fFacebookSignIn();
      return fEventLogin(); }
    default:
      break;
  }
  // console.log(route);
};

export { changeView };
