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
  // setDoc,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
  
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
// const db = getFirestore(app);
const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;
 
//-------------------------FUNCION para -----GUARDA USERDATA de REGISTRO
/*export function guardaDataReg() {
  const uid = userCred.uid;
  const name = document.getElementById('user-name').value;
  const username = document.getElementById('user-username').value;
  const email = document.getElementById('user-email').value;
  const password = document.getElementById('user-password').value;
 addDoc(collection(db, 'userdata'), {email, password, name, username, uid, country, birth
  })
}*/


//----------------------
//export const onGetName = (callback) =>  /*usado en getUserPerfil del DOM */
//onSnapshot(collection(db, 'userdata'), callback)
//console.log(onGetPost)

//-------------------------FUNCION para -------GUARDAR POST
// Función para crear nueva colección de datos
export function comentario(post) {
  // const auth = getAuth();
  const user = auth.currentUser.uid;
  const email = auth.currentUser.email;
  addDoc(collection(db, 'post'), { posts: post, uid: user, coreeo: email });
}
//-------------------------Funcion para---------TRAER POST
//export const onGetPost = (callback) =>    /*usado en getUserData del DOM */
//onSnapshot(collection(db, 'post'), callback)
//console.log(onGetPost)

//-------------------------------------------------
export function postUserActivo () {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      getDocs(collection(db, 'post'))
      //.then((snapshot) => {
      //  snapshot.docs.user.forEach(doc => {
          const oldComment = document.getElementById('oldComment').value;
          const userpost = user.post
          oldComment.textContent = userpost
         consol.log(doc);
    
    /*    onSnapshot(collection(db, 'post'));
    //console.log(onGetPost)
    (querySnapshot) => {
      querySnapshot.forEach(doc => {
        const oldComment = document.getElementById('oldComment');

        const userPost = doc.data();
        console.log(userPost.posts)}})}*/
      }})}


//-------------------------FUNCION para ----TRAER POST 2
/*export function obtenerData(doc) {
  const namePerfil = document.getElementById('namePerfil');
  const usuarioPerfil = document.getElementById('usuarioPerfil');
  namePerfil.setAttribute('data-id',doc.id);
  usuarioPerfil.setAttribute('data-id',doc.id);
  namePerfil.textContent = doc.data().name;
  usuarioPerfil.textContent = doc.data().username;
};
export function getNameUser () {
   getDocs(collection(db, 'usedata')).then((snapshot) => {
  snapshot.docs.forEach(doc => {
    obtenerData(doc);
  });
}); 
}*/

//---SI FUNCIONA----------------------FUNCION para ----TRAER name a perfil usuario logueado
export function userActivo () {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const namePerfil = document.getElementById('namePerfil');
      const usuarioPerfil = document.getElementById('usuarioPerfil');
      
      const name = user.name;
      const userEmail = user.email;

      namePerfil.textContent = name ;
      usuarioPerfil.textContent = userEmail;

      console.log(user);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //const uid = user.uid;
      // ...
   // } else {
      // User is signed out
      // ...
   // }
  }})};


// Función para registrarse con email y contraseña

export const obs = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(`user${uid}is loged`);
    // ...
    } else {
    // User is signed out
    // ...
      console.log('no user found');
    }
  });
};

//FUNCION REGISTRO y guarda datos en coleccion USERDATA

export function eventRegister(name, username, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      addDoc(collection(db, 'userdata'), {
      name, username, email, password, country, birth
      }); // Creacion db firestore del usuario
      const user = userCredential.user;
      const uid = user.uid;
      const email = document.getElementById('user-email').value;
      const password = document.getElementById('user-password').value;
     addDoc(collection(db, 'userdata'), {email, password, name, username, uid, country, birth
      //addDoc(collection(db, 'userdata'), {
     //   email, password, name, username, uid,
     //guardaDataReg()
    })
      sessionStorage.getItem(user);
      window.location.hash = '#/login';
      return (user);
      
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
      // console.log(user);
      // const user2 = auth.currentUser;
      // console.log(user2);
      // console.log(user.uid);
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

// Para actualizar perfil updateProfile
