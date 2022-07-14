import { components } from '../view/index.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/':
    { return container.appendChild(components.home()); }
    case '#/principal':
    { return container.appendChild(components.home()); }
    default:
      break;
  }
  console.log(route);
};
export { changeView };
