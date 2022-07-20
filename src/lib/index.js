/* eslint-disable import/no-unresolved */
// aqui exportaras las funciones que necesites
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from '../config2.js';
import { components } from '../view/index.js';
// CREDENCIALES
const firebaseConfig = {
  apiKey: `${apiKey}`,
  authDomain: `${authDomain}`,
  projectId: `${projectId}`,
  storageBucket: `${storageBucket}`,
  messagingSenderId: `${messagingSenderId}`,
  appId: `${appId}`,
  measurementId: `${measurementId}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const eventRegister = () => {
  // aqui tu codigo
  /* document.getElementById('btnRegister').addEventListener('click', (event) => {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const userUsername = document.getElementById('userUsername').value;
    const userCountry = document.getElementById('userCountry').value;
    const userBirth = document.getElementById('userBirth').value;
    console.log(userName + userUsername + userEmail + userPassword + userCountry + userBirth); */
  const signUpForm = document.querySelector('#registerForm');
  signUpForm.addEventListener('submit', () => {
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;
    console.log(userEmail, userPassword);
    console.log(firebaseConfig.apiKey);
    const auth = getAuth();
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log('user created successfully');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);
      });
    const container = document.getElementById('container');
    container.innerHTML = '';
    container.appendChild(components.login());
  });
};

export const eventLogin = () => {

};

// FUNCION PARA COMPARTIR UN POST EN HOME

export function sharePost() {
  const toShare = document.getElementById('toShare');
  let numberPost = 0;
  toShare.addEventListener('click', () => {
    const oldPost = `
      <div class="old-publication" >
        <p class="user-name-post">AQUI VA EL NOMBRE DE USUARIO</p>
        <input type="text" class="old-comment">
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
    // se debe almacenar en un solo div porque sino ('node') to Node.appendChild must be an instance of Node
    numberPost += 1;
    divElem.id = `post ${numberPost}`;
    divElem.innerHTML = oldPost;
    return parentPost.appendChild(divElem);
  });
}

// FUNCIÓN PARA INICIAR SESION DESPUES DE REGISTARTE
// eslint-disable-next-line import/newline-after-import
// eslint-disable-next-line import/first
// eslint-disable-next-line import/newline-after-import
// eslint-disable-next-line import/first


// export function irLogin() {
//   const btnRegisterLogin = document.getElementById('btnRegister');
//   // eslint-disable-next-line arrow-body-style
//   btnRegisterLogin.addEventListener('click', () => {
//   // eslint-disable-next-line no-undef
//     const container = document.getElementById('container');
//     container.innerHTML = '';
//     return container.appendChild(components.login());
// });
// };
