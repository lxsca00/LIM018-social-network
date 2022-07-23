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
export function eventRegister(email, password) {
  const auth = getAuth();
  // return createUserWithEmailAndPassword(auth, email, password)
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const electronicEmail = userCredential.user.email;
      // ...
      console.log(`user created successfully: ${user}`);
      sessionStorage.getItem(user);
      window.location.hash = '#/login';
      return (`${electronicEmail} created successfully`);
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(`${errorMessage}`);
      return ('error');
    });
}

// AUTENTIFICACIÓN DE USUARIO -LOGIN
export async function eventLogin(email, password) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user;
    const electronicEmail = userCredential.user.email;
    console.log(`${userCredential}, signed in`);
    sessionStorage.getItem(user);
    window.location.hash = '#/principal';
    return (`${electronicEmail} si tiene una cuenta activa`);
  } catch (error) {
    // const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    return (errorMessage);
  }
}

// CERRAR SESIÓN
export function eventLogout() {
  const auth = getAuth();
  signOut(auth).then(() => {
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
