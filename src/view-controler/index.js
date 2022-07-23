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
      console.log('object');
      return fSharePost(); }
    case '#/registro':
    { container.appendChild(components.register()); 
        console.log('se abrio login');
        fEventRegister(); }
      break;
    case '#/login':
    { container.appendChild(components.login());
      console.log('se abrio login');
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
