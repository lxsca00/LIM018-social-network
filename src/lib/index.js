/* eslint-disable import/no-unresolved */
import {
  initializeApp,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
// } from 'firebase/app'; // TEST
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js';
import {
  getAuth,
  onAuthStateChanged,
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
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();

// Función para crear nueva colección de datos
export function comentario(post) {
  const user = auth.currentUser.uid;
  const email = auth.currentUser.email;
  addDoc(collection(db, 'post'), { posts: post, uid: user, coreeo: email });
}

// Función para registrarse con email y contraseña

export const obs = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(`user${uid}is loged`);
      window.location.hash = '#/principal';
    // ...
    } else {
    // User is signed out
      console.log('no user found');
      window.location.hash = '#/';
    }
  });
};

export function eventRegister(name, username, email, password, country, description, birth, photo) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const uid = user.uid;
      addDoc(collection(db, 'userdata'), {
        email, password, name, username, uid, country, description, birth, photo,
      });
      sessionStorage.getItem(user);
      window.location.hash = '#/login';
      return (user);
    })
  // eslint-disable-next-line consistent-return
    .catch((error) => {
      const errorCode = error.code;
      /* const registerError = document.getElementById('email-register-error');
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
      } */
      return errorCode;
    });
}

// Función para ingresar con email y contraseña

export const eventLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      sessionStorage.getItem(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const loginError = document.querySelector('#login-email-error');
      const loginPasswordError = document.getElementById('login-password-error');
      if (errorCode === 'auth/user-not-found') {
        loginError.style.visibility = 'visible';
        loginError.innerHTML = 'No existe ningún usuario registrado con este email';
      } else if (errorCode === 'auth/invalid-email') {
        loginError.style.visibility = 'visible';
        loginError.innerHTML = 'Proporcione una dirección de correo';
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
    sessionStorage.clear();
    // Sign-out successful.
  }).catch((error) => error);
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
      addDoc(collection(db, 'userdata'), {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
        photo: user.photoURL,
        username: '',
        birth: '',
        country: '',
        description: '',
      });
      // ...
      sessionStorage.getItem(user);
    }).catch((error) => error.code);
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
      sessionStorage.getItem(user);
    })
    .catch((error) => error.code);
};

// Actualizar los campos vacíos en el documento de cada usuario
export async function saveData(userCountry, userDescription, userBirth) {
  // const user = auth.currentUser;
  const docRef = doc(db, 'userdata', 'nd2nZxrD37v6f9EDhlfK');
  await updateDoc(docRef, {
    country: userCountry,
    description: userDescription,
    birth: userBirth,
  });
}

export async function changePhoto(userPhoto) {
  // const user = auth.currentUser;
  const docRef = doc(db, 'userdata', 'nd2nZxrD37v6f9EDhlfK');
  await updateDoc(docRef, {
    photo: userPhoto,
  });
}

// Para obtener los datos del usuario activo

export const getUserData = () => {
  const user = auth.currentUser;
  console.log(user);
  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log(`Sign-in provider: ${profile.providerId}`);
      console.log(`Provider-specific UID: ${profile.uid}`);
      console.log(`Name: ${profile.displayName}`);
      console.log(`Email: ${profile.email}`);
      console.log(`Photo URL: ${profile.photoURL}`);
    });
  }
};
