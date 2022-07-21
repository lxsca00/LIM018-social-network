/* eslint-disable import/no-unresolved */
// aqui exportaras las funciones que necesites
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';
import { getDatabase, ref, set, update } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
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
    // FUNCIÓN PARA INICIAR SESION DESPUES DE REGISTARTE  
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

//   // AUTENTIFICACIÓN DE USUARIO

const database = getDatabase(app);
const auth = getAuth();
export const eventLogin2 = () => {
  const loginForm = document.querySelector('#form-login');
  loginForm.addEventListener('submit', () => {
    const email = document.getElementById('ingresaEmail').value;
    const password = document.getElementById('ingresaContrasena').value;

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // ... user.uid
    //     set(ref(database, `users/ + ${user.uid}`), {
    //       email: email,
    //       password: password,
    //     })
    //       .then(() => {
    //       // Data saved successfully!
    //         alert('user created successfully');
    //       })
    //       .catch((error) => {
    //         // The write failed...
    //         alert(error);
    //       });
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    //     alert(errorMessage);
    //   });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        const lgDate = new Date();
        update(ref(database, `users/ + ${user.uid}`), {
          last_login: lgDate,
        })
          .then(() => {
          // Data saved successfully!
            console.log('user logged is successfully');
          })
          .catch((error) => {
            // The write failed...
            alert(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  });
};
// export function login () {
//   const userEmail = document.getElementById('userEmail').value;
//   const userPassword = document.getElementById('userPassword').value;
//   if (validate_email(userEmail)==false)
// }


// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//   // User is signed in, see docs for a list of available properties
//   // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     console.log(`${uid} esta registrado`);
//   } else {
//     console.log('no esta registrado');
//   // User is signed out
//   // ...
//   }
// });
