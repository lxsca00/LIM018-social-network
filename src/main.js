// Este es el punto de entrada de tu aplicacion // RELACION CON EL DOM
import { changeView } from './view-controler/index.js';

// PARA CAMBIAR DE VISTA
// const ubicacion = `${window.location.href}#/`;
// window.location = ubicacion;
const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);
