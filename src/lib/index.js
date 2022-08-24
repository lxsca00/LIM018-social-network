import {
  auth,
  // db, // no promise
  // onAuthStateChanged, // es promesa (if-else)
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
  updateDoc,
  // onSnapshot,
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

// export const obs = () => {
//   console.log('hola');
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       console.log('hola2');
//       document.getElementById('header').style.visibility = 'visible';
//     // ...
//     } else {
//       console.log('no user found');
//       document.getElementById('header').style.visibility = 'hidden';
//     }
//   });
// };
export const obs = () => {
  const user = auth.currentUser;
  if (user) {
    document.getElementById('header').style.visibility = 'visible';
  } else {
    document.getElementById('header').style.visibility = 'hidden';
  }
};

// Función para cerrar la sesión // AQUI

export function eventLogout() {
  signOut(auth).then(() => {
    sessionStorage.clear();
    return console.log('se cerró sesión exitosamente');
    // Sign-out successful.
  }).catch((error) => error.code);
}

// FUNCION PARA GUARDAR DATOS DEL PERFIL
export const saveData = async (uid, country, description, preference, genre) => updateDoc(doc(db, 'userdata', uid), {
  country, description, preference, genre,
});

// VER DATOS ACTUALIZADOS
// export const seeProfile = (uid) => onSnapshot(doc(db, 'userdata', uid),
// { includeMetadataChanges: true }, (dok) => {})
