/* eslint-disable import/no-unresolved */
import {
  initializeApp,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
// } from 'firebase/app'; // TEST
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';
// } from 'firebase/auth'; // TEST

import {
  getFirestore,
  collection,
  addDoc,
  // setDoc,
  doc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';
// } from 'firebase/firestore'; // TEST

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
// eslint-disable-next-line max-len
/* export const comentario = (comentariouser) => addDoc(collection(db, 'userdata'), { comentariouser });

window.addEventListener('DOMContentLoaded', () => {

}); */

// Función para registrarse con email y contraseña

export function eventRegister(name, username, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      addDoc(collection(db, 'userdata'), {
        name, username, email, password,
      }); // Creacion db firestore del usuario
      const user = userCredential.user;
      sessionStorage.getItem(user);
      window.location.hash = '#/login';
    })
  // eslint-disable-next-line consistent-return
    .catch((error) => {
      const errorCode = error.code;
      const registerError = document.getElementById('email-register-error');
      const registerPasswordError = document.getElementById('password-register-error');
      if (errorCode === 'auth/email-already-in-use') {
        registerError.style.visibility = 'visible';
        registerError.innerHTML = 'Email en uso, intenta iniciar sesión';
      } else if (errorCode === 'auth/invalid-email') {
        registerError.style.visibility = 'visible';
        registerError.innerHTML = 'Proporcione una dirección de correo válida';
      } else if (errorCode === 'auth/internal-error') {
        registerPasswordError.style.visibility = 'visible';
        registerPasswordError.innerHTML = 'El ingreso de contraseña es obligatorio';
      } else if (errorCode === 'auth/weak-password') {
        registerPasswordError.style.visibility = 'visible';
        registerPasswordError.innerHTML = 'Tu contraseña debe tener al menos 6 caracteres';
      }
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
      const errorCode = error.code;
      const loginError = document.getElementById('login-email-error');
      const loginPasswordError = document.getElementById('login-password-error');
      if (errorCode === 'auth/user-not-found') {
        loginError.style.visibility = 'visible';
        loginError.innerHTML = 'No existe ningún usuario registrado con este email';
      } else if (errorCode === 'auth/invalid-email') {
        loginError.style.visibility = 'visible';
        loginError.innerHTML = 'El email ingresado es inválido';
      } else if (errorCode === 'auth/internal-error') {
        loginPasswordError.style.visibility = 'visible';
        loginPasswordError.innerHTML = 'El ingreso de contraseña es obligatorio';
      } else if (errorCode === 'auth/wrong-password') {
        loginPasswordError.style.visibility = 'visible';
        loginPasswordError.innerHTML = 'La contraseña ingresada es incorrecta';
      }
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

// export const saveTask = (comment) => {
// addDoc(collection(db, 'userdata'), { comment });
// };

// export async function saveBirth(birth) {
// await setDoc(doc(db, 'userdata', birth));
// }

export async function saveCountry(country) {
  // setDoc(doc(db, 'userdata', country));
  const userCountry = doc(db, 'country', country);
  await updateDoc(userCountry, { capital: true });
}
