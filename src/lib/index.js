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
  setDoc,
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
      document.getElementById('header').style.visibility = 'visible';
    // ...
    } else {
    // User is signed out
      console.log('no user found');
      document.getElementById('header').style.visibility = 'hidden';
    }
  });
};

export function eventRegister(name, username, email, password, country, description, birth, photo) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const uid = user.uid;
      setDoc(doc(db, 'userdata', uid), {
        email, password, name, username, uid, country, description, birth, photo,
      });
      sessionStorage.getItem(user);
      window.location.hash = '#/login';
      return (user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const modalError = document.querySelector('.background-modal-error');
      modalError.style.visibility = 'visible';
      const errorMessage = document.querySelector('.register-error');
      switch (errorCode) {
        case 'auth/email-already-in-use': {
          errorMessage.innerHTML = 'Email en uso, intenta iniciar sesión';
          break;
        }
        case 'auth/invalid-email': {
          errorMessage.innerHTML = 'Proporcione una dirección de correo válida';
          break;
        }
        case 'auth/internal-error': {
          errorMessage.innerHTML = 'El ingreso de contraseña es obligatorio';
          break;
        }
        case 'auth/weak-password': {
          errorMessage.innerHTML = 'Tu contraseña debe tener al menos 6 caracteres';
          break;
        }
        default: errorMessage.innerHTML = 'Vuelve a intentarlo';
          break;
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
    })
    .catch((error) => {
      const errorCode = error.code;
      const modalError = document.querySelector('.background-modal-error');
      modalError.style.visibility = 'visible';
      const errorMessage = document.querySelector('.login-error');
      switch (errorCode) {
        case 'auth/user-not-found': {
          errorMessage.innerHTML = 'No existe ningún usuario registrado con este email';
          break;
        }
        case 'auth/invalid-email': {
          errorMessage.innerHTML = 'Proporcione una dirección de correo válida';
          break;
        }
        case 'auth/internal-error': {
          errorMessage.innerHTML = 'El ingreso de contraseña es obligatorio';
          break;
        }
        case 'auth/wrong-password': {
          errorMessage.innerHTML = 'La contraseña ingresada es incorrecta';
          break;
        }
        default: errorMessage.innerHTML = 'Por favor vuelve a intentarlo';
          break;
      }
    });
};

// Función para cerrar la sesión

export function eventLogout() {
  signOut(auth).then(() => {
    // window.location.hash = '#/login';
    sessionStorage.clear();
    return console.log('se cerró sesión exitosamente');
    // Sign-out successful.
  }).catch((error) => error);
}

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
    }).catch((error) => console.log(error.code));
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
export async function saveData(userCountry, userDescription, userBirth, userPreference, userGenre) {
  const user = auth.currentUser;
  const uid = user.uid;
  const docRef = doc(db, 'userdata', uid);
  await updateDoc(docRef, {
    country: userCountry,
    description: userDescription,
    birth: userBirth,
    preference: userPreference,
    genres: userGenre,
  });
}

export async function changePhoto(userPhoto) {
  const user = auth.currentUser;
  const uid = user.uid;
  const docRef = doc(db, 'userdata', uid);
  await updateDoc(docRef, {
    photo: userPhoto,
  });
}

// Para obtener los datos del usuario activo

/* export const getUserData = () => {
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
}; */
