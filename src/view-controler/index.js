import { components } from '../view/index.js';
import {
  eventRegister,
  sharePost,
  eventLogin2,
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
      return sharePost(); }
    case '#/registro':
      // eslint-disable-next-line no-lone-blocks
      { container.appendChild(components.register());
        eventRegister(); }
      break;
    case '#/login':
    { container.appendChild(components.login());
      return eventLogin2(); }
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
