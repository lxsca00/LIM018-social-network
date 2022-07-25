/* eslint-disable import/no-unresolved */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();

// Función para crear nueva colección de datos
export const comentario = (comentariouser) => addDoc(collection(db, 'userdata'), { comentariouser });

window.addEventListener('DOMContentLoaded', () => {

});

// Función para registrarse con email y contraseña

export const eventRegister = () => {
  const signUpForm = document.querySelector('#register-form');
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('user-name').value;
    const username = document.getElementById('user-username').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const country = document.getElementById('user-country').value;
    const birth = document.getElementById('user-birth').value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        addDoc(collection(db, 'userdata'), {
          name, username, email, password, country, birth,
        }); // Creacion db firestore del usuario
        const user = userCredential.user;
        sessionStorage.getItem(user);
        window.location.hash = '#/login';
        // Agregar un modal que diga que se creó satisfactoriamente e inicie sesión
      })
      .catch((error) => {
        const errorMessage = error.message;
        const mensajealert = (`Intentalo Nuevamente : ${errorMessage}`); // Mensaje error registro
        alert(mensajealert);
      });
  });
};

// Función para ingresar con email y contraseña

export const eventLogin = () => {
  const signInForm = document.querySelector('#form-login');
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    console.log(email, password);
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
  });
};

// Función para cerrar la sesión

export const eventLogout = () => {
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      window.location.hash = '#/login';
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log(error);
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

// Función para que aparezca un modal para editar perfil

export const editProfile = () => {
  document.getElementById('editProfile').addEventListener('click', (e) => {
    e.preventDefault();
    const profile = document.querySelector('.profile');
    const modal = `
    <div class="modal-edit">
      <div class="modal-card">
        <button class="close">&times;</button>
        <h3> Editar perfil </h3>
        <input type="text" id="changeDescription" placeholder="Aquí va tu descripción">
        <h3> ¿Qué prefieres ver? </h3>
        <input type="text" id="changeElection" placeholder="¿Peliculas o series?">
        <h3> ¿Tu género favorito? <h3>
        <input type="text" id="changeGenre" placeholder="Cuentanos cuáles son tus géneros favoritos">
        <button type="button" id="saveChanges"> Guardar cambios </button>
      </div>
    <div>`;
    profile.insertAdjacentHTML('beforeend', modal);
    document.querySelector('.close').addEventListener('click', () => {
      const containerModal = document.querySelector('.modal-edit');
      containerModal.remove();
    });
    document.querySelector('#saveChanges').addEventListener('click', () => {
      const newDescription = document.getElementById('changeDescription').value;
      const oldDescription = document.querySelector('.user-description');
      const containerModal = document.querySelector('.modal-edit');
      if (newDescription !== '') {
        oldDescription.innerHTML = newDescription;
        containerModal.remove();
      }
    });
  });
};

// Función para iniciar sesión con Google

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  document.querySelector('.image-google').addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        sessionStorage.getItem(user);
        window.location.hash = '#/principal';
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  });
};

// Iniciar sesión con Facebook
export const facebookSignIn = () => {
  const provider = new FacebookAuthProvider();
  document.querySelector('.image-facebook').addEventListener('click', (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        // ...
        sessionStorage.getItem(user);
        window.location.hash = '#/principal';
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  });
};
