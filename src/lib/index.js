import {
  auth,
  // db, // no promise
  onAuthStateChanged, // es promesa (if-else)
  signOut, // es promesa
  // doc, // no promise
  // getDoc,
  // REGISTER
  setDoc,
  doc,
  db,
  createUserWithEmailAndPassword, // es promesa // .then y .catch se usan para llamar a una promesa
  // LOGIN
  signInWithEmailAndPassword, // es promesa //
  // es promesa (if-else)
  signInWithPopup, // es promesa
  // GoogleAuthProvider, // no promise?
} from './firebase.js';

/* **************** REGISTRO DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
// eslint-disable-next-line max-len
export const eventRegisterFirebase = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const eventSetDoc = (uid, name, email, password, country, description, photo) => setDoc(doc(db, 'userdata', uid), {
  email, password, name, uid, country, description, photo,
});

/* **************** LOGIN DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
export const eventLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const eventsignInWithPopup = (provider) => signInWithPopup(auth, provider);
// Para obtener los datos del usuario activo en tiempo real en el profile // AQUI
export const obs = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(`user ${uid} is loged`);
      // window.location.hash = '#/home';
      document.getElementById('header').style.visibility = 'visible';
    // ...
    } else {
    // User is signed out
      console.log('no user found');
      document.getElementById('header').style.visibility = 'hidden';
    }
  });
};

// Función para cerrar la sesión // AQUI

export function eventLogout() {
  signOut(auth).then(() => {
    sessionStorage.clear();
    return console.log('se cerró sesión exitosamente');
    // Sign-out successful.
  }).catch((error) => error.code);
}
