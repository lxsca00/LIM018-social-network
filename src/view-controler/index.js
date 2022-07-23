import { components } from '../view/index.js';
import {
  fEventRegister,
  fEventLogin,
  fEventLogout,
  fSharePost,
} from '../main.js';

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
    // eslint-disable-next-line no-lone-blocks
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
// export { changeView };

// PARA CAMBIAR DE VISTA
const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);
