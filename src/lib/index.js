/* eslint-disable import/no-unresolved */
// aqui exportaras las funciones que necesites // FUNCIONES PURAS?
// FIREBASE
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js'
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  // onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';
import {
  getDatabase, ref,
  // set,
  update,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js';
import {
  apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId 
} from '../config2.js';
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

// AUTENTIFICACIÓN DE USUARIO

const database = getDatabase(app);
const auth = getAuth();
export const eventLogin2 = () => {
  const loginForm = document.querySelector('#form-login');
  loginForm.addEventListener('submit', () => {
    const email = document.getElementById('ingresaEmail').value;
    const password = document.getElementById('ingresaContrasena').value;

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
            console.log(error);
          });
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  });
};

