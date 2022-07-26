// Este es el punto de entrada de tu aplicacion // RELACION CON EL DOM

import {
  eventRegister,
  eventLogin,
  eventLogout,
  //saveComment,
  //getComment,
 // getUser,
  //saveUser,
} from './lib/index.js';

// eslint-disable-next-line import/no-cycle
import { changeView } from './view-controler/index.js';


// PARA CAMBIAR DE VISTA
const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);

// REGISTRO DE USUARIO
export const fEventRegister = () => {
  const signUpForm = document.querySelector('#register-form');
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const name = document.getElementById('user-name').value;
    const username = document.getElementById('user-username').value;
    
    eventRegister(email, password);
    
    
     })};
    

   //saveUser(email, password,name,username);
   


// AUTENTIFICACIÓN DE USUARIO -LOGIN
export const fEventLogin = () => {
  const signInForm = document.querySelector('#form-login');
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    eventLogin(email, password);
  });
};

// CERRAR SESIÓN
export const fEventLogout = () => {
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    eventLogout();
  });
};

// FUNCION PARA COMPARTIR UN POST EN HOME
export function fSharePost() {
  const toShare = document.getElementById('toShare');
  let numberPost = 0;
  toShare.addEventListener('click', () => {
    const oldPost = `
      <div class="old-publication" >
        <p class="user-name-post">AQUI VA EL NOMBRE DE USUARIO</p>
        <input type="text" class="old-comment" id="old-comment" >
        <div class="container-button">
          <div class="emojis">
            <input type="button" title="Click to coment" value="🍿"  class="button-emoji" >
            <input type="button" title="Click to coment" value="🤍"  class="button-emoji" >
          </div>
         <input type="button" title="Click to coment" value="Comentar "  class="comment-button" >
        </div>
          </div>
      </div>`;

    const parentPost = document.getElementById('all-publications');
    const divElem = document.createElement('div');
    // se debe almacenar en un solo div porque sino "to Node.appendChild must be an instance of Nod"
    numberPost += 1;
    divElem.id = `post ${numberPost}`;
    divElem.innerHTML = oldPost;
    return parentPost.appendChild(divElem);
  });
}

//guardar datos en firesor - registro

 /*export function registerFirebase() {
  const btnRegister = document.getElementById('btnRegister');
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault()
  const email = document.getElementById('user-email').value;
  const password = document.getElementById('user-password').value;
  const name = document.getElementById('user-name').value;
  const username = document.getElementById('user-username').value;
  console.log(email)
  const user2 =  eventRegister(email, password);
  return saveUser(email, password, name, username, user2);

 })};*/


/*const toShare = document.getElementById('toShare');
const oldComment = document.getElementById('old-Comment');

toShare.addEventListener('click', () => {
 saveComment(uid, comment)
});*/