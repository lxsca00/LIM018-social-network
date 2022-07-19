import { eventRegister } from '../lib/index.js';
import { components } from '../view/index.js';

// eslint-disable-next-line consistent-return
const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/':
    { return container.appendChild(components.login()); }
    case '#/principal':
    { return container.appendChild(components.home()); }
    case '#/registro':
      // eslint-disable-next-line no-lone-blocks
      { container.appendChild(components.register());
        eventRegister(); }
      break;
    case '#/login':
    { return container.appendChild(components.login()); }
    default:
      break;
  }
  // console.log(route);
};
export { changeView };
