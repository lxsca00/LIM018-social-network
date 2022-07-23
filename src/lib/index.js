/* eslint-disable import/no-unresolved */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';
import {
  apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId,
} from '../config2.js';

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
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const eventRegister = () => {
  const signUpForm = document.querySelector('#register-form');
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const auth = getAuth();
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const name = document.getElementById('user-name').value;
    const username = document.getElementById('user-username').value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(`user created successfully: ${user}`);
        sessionStorage.getItem(user);
        window.location.hash = '#/login';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);
      });
    /* async function saveUser() {
      try {
        const docRef = await addDoc(collection(db, 'users'), {
          first: 'Ada',
          last: 'Lovelace',
          born: 1815,
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (i) {
        console.error('Error adding document: ', i);
      }
    }
    saveUser(); */
  });
};

export const eventLogin = () => {
  const signInForm = document.querySelector('#form-login');
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const auth = getAuth();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(`${userCredential}, signed in`);
        sessionStorage.getItem(user);
        window.location.hash = '#/principal';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  });
};

export const eventLogout = () => {
  const logout = document.querySelector('#logout');
  const auth = getAuth();
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      window.location.hash = '#/login';
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log('something happened');
    });
    sessionStorage.clear();
  });
};

// FUNCION PARA COMPARTIR UN POST EN HOME

export function sharePost() {
  const toShare = document.getElementById('toShare');
  let numberPost = 0;
  toShare.addEventListener('click', () => {
    const oldPost = `
      <div class="old-publication" >
        <p class="user-name-post">AQUI VA EL NOMBRE DE USUARIO</p>
        <input type="text" class="old-comment">
        <div class="container-button">
          <div class="emojis">
            <input type="button" title="Click to coment" value="🍿"  class="button-emoji" >
            <input type="button" title="Click to coment" value="🤍"  class="button-emoji" >
          </div>
         <input type="button" title="Click to coment" value="Comentar "  class="comment-button" >
        </div>
          </div>
      </div>`;

    const parentPost = document.getElementById('all-publications');
    const divElem = document.createElement('div');
    // eslint-disable-next-line max-len
    // se debe almacenar en un solo div porque sino ('node') to Node.appendChild must be an instance of Node
    numberPost += 1;
    divElem.id = `post ${numberPost}`;
    divElem.innerHTML = oldPost;
    return parentPost.appendChild(divElem);
  });
}
