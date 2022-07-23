import {
  eventLogin, eventLogout, eventRegister, sharePost,
} from '../lib/index.js';
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
      // eslint-disable-next-line no-lone-blocks
      { container.appendChild(components.register());
        eventRegister(); }
      break;
    case '#/login':
    { container.appendChild(components.login());
      return eventLogin(); }
    case '#/cerrarSesion':
    { return eventLogout(); }
    default:
      break;
  }
  // console.log(route);
};
export { changeView };
