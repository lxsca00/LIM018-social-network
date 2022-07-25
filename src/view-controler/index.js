import {
  eventLogin, eventLogout, eventRegister, sharePost, editProfile, googleSignIn, facebookSignIn,
} from '../lib/index.js';
import { addCountries } from '../view/countries.js';
import { components } from '../view/index.js';

// eslint-disable-next-line consistent-return
const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/':
    { return container.appendChild(components.login()); }
    case '#/principal':
    { container.appendChild(components.home());
      return sharePost(); }
    case '#/registro':
    { container.appendChild(components.register());
      addCountries();
      return eventRegister(); }
    case '#/login':
    { container.appendChild(components.login());
      googleSignIn();
      facebookSignIn();
      return eventLogin(); }
    case '#/profile':
    { container.appendChild(components.profile());
      return editProfile(); }
    case '#/cerrarSesion':
    { return eventLogout(); }
    default:
      break;
  }
  // console.log(route);
};
export { changeView };
