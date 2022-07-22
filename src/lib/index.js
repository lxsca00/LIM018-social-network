/* eslint-disable import/no-unresolved */
// aqui exportaras las funciones que necesites // FUNCIONES PURAS?
// FIREBASE

import { initializeApp } from 'firebase/app';
// eslint-disable-next-line max-len
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
// import {
//   getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
// } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';
import { components } from '../view/index.js';
// CREDENCIALES
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

// REGISTRO DE USUARIO
export function registerUser(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user.email;
      // ...
      console.log(`${user} created successfully`);
      return (`${user} created successfully`);
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(`${errorMessage}`);
      return (`${errorMessage}`);
    });
}

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
export async function ingreso(email, password) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user.email;
    console.log(`El ${user} si tiene una cuenta activa`);
    return (`El ${user} si tiene una cuenta activa`);
  } catch (error) {
    // const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    return (errorMessage);
  }
}
