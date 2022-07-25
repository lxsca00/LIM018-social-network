/* eslint-disable import/no-unresolved */
import {
  initializeApp,
// } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
} from 'firebase/app'; // TEST
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} // } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';
from 'firebase/auth'; // TEST

import {
  getFirestore,
  collection,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js'; */

/* import {
  getAnalytics,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js'; */


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

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();

// Función para crear nueva colección de datos
export const comentario = (comentariouser) => addDoc(collection(db, 'userdata'), { comentariouser });

window.addEventListener('DOMContentLoaded', () => {

});

// Función para registrarse con email y contraseña

export async function eventRegister(name, username, email, password, country, birth) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      addDoc(collection(db, 'userdata'), {
        name, username, email, password, country, birth,
      }); // Creacion db firestore del usuario
      const user = userCredential.user;
      sessionStorage.getItem(user);
      window.location.hash = '#/login';
      // Agregar un modal que diga que se creó satisfactoriamente e inicie sesión
    })
  // eslint-disable-next-line consistent-return
    .catch((error) => {
      const errorMessage = error.message;
      const mensajealert = (`Intentalo Nuevamente : ${errorMessage}`); // Mensaje error registro
      alert(mensajealert);
    });
}

// Función para ingresar con email y contraseña

export const eventLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      sessionStorage.getItem(user);
      window.location.hash = '#/principal';
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage); // Mensaje de error
      // Agregar modal que lance el error
    });
};

// Función para cerrar la sesión

export const eventLogout = () => {
  signOut(auth).then(() => {
    window.location.hash = '#/login';
    sessionStorage.clear();
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
};

// Función para iniciar sesión con Google

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      sessionStorage.getItem(user);
      window.location.hash = '#/principal';
    }).catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorMessage);
    });
};

// Iniciar sesión con Facebook
export const facebookSignIn = () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const credential = FacebookAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;
      // ...
      sessionStorage.getItem(user);
      window.location.hash = '#/principal';
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(errorMessage);
      // ...
    });
};
