// Este es el punto de entrada de tu aplicacion // RELACION CON EL DOM
import { changeView } from './view-controler/index.js';

// PARA CAMBIAR DE VISTA
const init = () => {
  window.location.hash = '#/';
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);
