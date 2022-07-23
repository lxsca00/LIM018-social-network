/* eslint-disable import/no-cycle */
import {
  fEventRegister,
  fEventLogin,
  fEventLogout,
  fSharePost,
} from '../main.js';
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
      return fSharePost(); }
    case '#/registro':
    { container.appendChild(components.register());
      return fEventRegister(); }
    case '#/login':
    { container.appendChild(components.login());
      return fEventLogin(); }
    case '#/cerrarSesion':
    { console.log('se cerro sesion');
      return fEventLogout(); }
    default:
      break;
  }
  // console.log(route);
};

export { changeView };
