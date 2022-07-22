/* eslint-disable import/no-unresolved */

import {
  initializeApp,
// } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
} from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // signOut,
// } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';
} from 'firebase/auth';

/* import {
  getFirestore,
  collection,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js'; */

/* import {
  getAnalytics,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js'; */

// CREDENCIALES
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

// REGISTRO DE USUARIO
export function eventRegister(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user.email;
      // ...
      console.log(`user created successfully: ${user}`);
      sessionStorage.getItem(user);
      window.location.hash = '#/login';
      return (`${user} created successfully`);
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(`${errorMessage}`);
      return (`${errorMessage}`);
    });
}

// AUTENTIFICACIÓN DE USUARIO
export async function eventLogin(email, password) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user;
    const electronicEmail = userCredential.user.email;
    console.log(`${userCredential}, signed in`);
    sessionStorage.getItem(user);
    window.location.hash = '#/principal';
    return (`${electronicEmail} si tiene una cuenta activa`);
  } catch (error) {
    // const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    return (errorMessage);
  }
}

// REGISTRO DE USUARIO
export function eventRegister(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user.email;
      // ...
      console.log(`user created successfully: ${user}`);
      sessionStorage.getItem(user);
      window.location.hash = '#/login';
      return (`${user} created successfully`);
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(`${errorMessage}`);
      return (`${errorMessage}`);
    });
}

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
