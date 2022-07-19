import { sharePost } from '../lib/index.js';
import { components } from '../view/index.js';

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
    { return container.appendChild(components.register()); }
    case '#/login':
    { return container.appendChild(components.login()); }
    default:
      break;
  }
  return console.log(route);
};
export { changeView };
