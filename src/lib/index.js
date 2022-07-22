// aqui exportaras las funciones que necesites // FUNCIONES PURAS?
// FIREBASE
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// import {
// // getDatabase, ref,
// // set,
// // update,
// } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js';
// import {
//   apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId,
//   } from '../config2.js';
import { components } from '../view/index.js';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyACc51LXOjvtbxdJZvHc4gM_0y2VgVoN-U',
  authDomain: 'popcorn-zone-698e0.firebaseapp.com',
  projectId: 'popcorn-zone-698e0',
  storageBucket: 'popcorn-zone-698e0.appspot.com',
  messagingSenderId: '801567687163',
  appId: '1:801567687163:web:19c68d5004a3fb78210b5e',
  measurementId: 'G-XDE8KYM2TV',
};

// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js';

// getAuth, // para funcion INGRESO-LOGIN de usuario
// createUserWithEmailAndPassword,
// signInWithEmailAndPassword, // para funcion INGRESO-LOGIN de usuario
// onAuthStateChanged,

// CREDENCIALES

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export const eventRegister = () => {
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
        console.log(`${user} created successfully`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(`${errorMessage} ${errorCode} `);
      });
    // FUNCIÓN PARA INICIAR SESION DESPUES DE REGISTARTE
    const container = document.getElementById('container');
    container.innerHTML = '';
    container.appendChild(components.login());
  });
};

export const eventLogin = () => {

};

// AUTENTIFICACIÓN DE USUARIO

// export function ingreso(email, password) {
//   const auth = getAuth();
//   return signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user.email;
//       console.log(`El ${user} si tiene una cuenta activa`);
//       // ...
//     })
//     .catch((error) => {
//       // const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorMessage); // auth/user auth/internal etc
//     });
// }

export function ingreso(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user.email;
      return (`El ${user} si tiene una cuenta activa`);
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      return (errorMessage); // auth/user auth/internal etc
    });
}
