/* eslint-disable max-len */
import {
  auth,
  signOut, // es promesa
  setDoc,
  doc,
  db,
  createUserWithEmailAndPassword, // es promesa // .then y .catch se usan para llamar a una promesa
  // LOGIN
  signInWithEmailAndPassword, // es promesa //
  signInWithPopup, // es promesa
  updateDoc,
} from './firebase.js';

/* **************** REGISTRO DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
export const eventRegisterFirebase = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const eventSetDoc = (uid, name, email, password, country, description, photo) => setDoc(doc(db, 'userdata', uid), {
  email, password, name, uid, country, description, photo,
});

/* **************** LOGIN DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
export const eventLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const eventsignInWithPopup = (provider) => signInWithPopup(auth, provider);

export const obs = () => {
  const user = auth.currentUser;
  if (user) {
    document.getElementById('header').style.visibility = 'visible';
  } else {
    document.getElementById('header').style.visibility = 'hidden';
  }
};

// FUNCION PARA GUARDAR DATOS DEL PERFIL
export const saveData = async (uid, country, description, preference, genre) => updateDoc(doc(db, 'userdata', uid), {
  country, description, preference, genre,
});

// CERRAR MODALES DE ERROR
export function closeModal() {
  document.querySelector('.close-modal').addEventListener('click', (e) => {
    e.preventDefault();
    const containerModal = document.querySelector('.background-modal');
    containerModal.style.visibility = 'hidden';
    if (window.location.hash === '#/registro') {
      const signUpForm = document.querySelector('#register-form');
      signUpForm.reset();
    } else if (window.location.hash === '#/login') {
      const signInForm = document.querySelector('#form-login');
      signInForm.reset();
    }
  });
}

// CERRAR SESIÓN
export function flogout() {
  const logOutButton = document.querySelector('#logout');
  logOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      sessionStorage.clear();
      return ('se cerró sesión exitosamente');
    }).catch((error) => error.code);
    window.location.hash = '#/';
    window.location.reload();
  });
}
