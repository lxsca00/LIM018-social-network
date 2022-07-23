/* eslint-disable import/no-unresolved */
import {
  initializeApp,
// } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
} from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
// } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';
} from 'firebase/auth';

/* import {
  getFirestore,
  collection,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js'; */

/* import {
  getAnalytics,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js'; */

// CREDENCIALES
const firebaseConfig = {
  apiKey: 'AIzaSyACc51LXOjvtbxdJZvHc4gM_0y2VgVoN-U',
  authDomain: 'popcorn-zone-698e0.firebaseapp.com',
  projectId: 'popcorn-zone-698e0',
  storageBucket: 'popcorn-zone-698e0.appspot.com',
  messagingSenderId: '801567687163',
  appId: '1:801567687163:web:19c68d5004a3fb78210b5e',
  measurementId: 'G-XDE8KYM2TV',
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// FUNCIONES PURAS - TO TEST

// REGISTRO DE USUARIO
export function eventRegister(eMail, password) {
  const auth = getAuth();
  // createUserWithEmailAndPassword(auth, email, password) // con return para que sea una promesa
  return createUserWithEmailAndPassword(auth, eMail, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const electronicEmail = userCredential.user.email;
      // ...
      console.log(`user created successfully: ${user}`);
      // sessionStorage.getItem(user); // TEST: se comenta porque "sessionStorage is not defined"
      // window.location.hash = '#/login'; //TEST: window is not defined
      return (`${electronicEmail} created successfully`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorMessage);
      console.log(errorCode);
      // alert(`${errorMessage}`) // TEST: el alert para los test is not defined
      return (errorMessage);
    });
}

// AUTENTIFICACIÓN DE USUARIO -LOGIN
export async function eventLogin(eMail, password) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, eMail, password);
    // Signed in
    // const user = userCredential.user;
    const electronicEmail = userCredential.user.email;
    // console.log(`${user}, signed in`);
    // console.log(`${userCredential}, signed in`);
    // sessionStorage.getItem(user); // TEST: se comenta porque "sessionStorage is not defined"
    // window.location.hash = '#/principal'; //TEST: window is not defined
    return (`${electronicEmail} si tiene una cuenta activa`);
  } catch (error) {
    // const errorCode = error.code;
    const errorMessage = error.message;
    // console.log(errorMessage); // TEST: el alert para los test is not defined
    // console.log(errorCode);
    return (errorMessage);
  }
}

// CERRAR SESIÓN
export function eventLogout() {
  const auth = getAuth();
  return signOut(auth).then(() => {
    window.location.hash = '#/login';
    console.log('Sign-out successful');
    sessionStorage.clear();
    return ('cerraste sesión');
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    console.log(`something happened ${error}`);
    return ('error al cerrar sesión');
  });
  // sessionStorage.clear();
}
