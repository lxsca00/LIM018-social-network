import {
// eventLogin,
  obs,
// googleSignIn,
} from '../lib/index.js';

import {
  setDoc, //  es promesa (await)
  auth,
  doc, // no promise
  db, // no promise
  signInWithEmailAndPassword, // es promesa
  signInWithPopup, // es promesa
  GoogleAuthProvider, // no promise?
} from '../lib/firebase.js';

//  Vista de la página de ingreso

export default () => {
  const loginView = `
    <div class="background-logo">
      <img class="img-logo" src="https://i.pinimg.com/originals/54/cc/e0/54cce0449cfd4414fdc19b068a97e00a.png">
    </div>
    <form id = "form-login" class="form-login"> 
      <h1>Inicia sesión</h1>
      <p> Por favor inicia sesión para continuar </p>
      <input type="email" placeholder="Correo Electrónico" id="login-email">
      <input type="password" placeholder="Contraseña" id="login-password">
      <button type="submit" id="login-button"> INGRESAR </button>
      <p class="try"> O intenta: </p>
      <button id="button-google">
        <img src="images/google1.png"> 
        INICIAR SESIÓN CON GOOGLE 
      </button>
      <p> ¿No tienes cuenta? <a href="#/registro"> Regístrate </a> </p>
    </form>
    <div class="background-modal">
      <div class="modal-error">
        <p class="login-error"> Hay un error </p>
        <button class="close-modal"> CERRAR </button>
      </div>
    <div>`;
  const divLogin = document.createElement('section');
  divLogin.id = 'login';
  divLogin.innerHTML = loginView;
  return divLogin;
};

// Función para ingresar con email y contraseña

export const eventLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

// AUTENTIFICACIÓN DE USUARIO -LOGIN CON CONTRASEÑA
export function eventLoginGlobal() {
  const eMail = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  return eventLogin(eMail, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      sessionStorage.getItem(user);
      return ('user is loged');
    })
    .catch((error) => {
      const errorCode = error.code;
      const modalError = document.querySelector('.background-modal');
      modalError.style.visibility = 'visible';
      const errorMessage = document.querySelector('.login-error');
      switch (errorCode) {
        case 'auth/user-not-found': {
          errorMessage.innerHTML = 'No existe ningún usuario registrado con este email.';
          break;
        }
        case 'auth/invalid-email': {
          errorMessage.innerHTML = 'Proporcione una dirección de correo válida.';
          break;
        }
        case 'auth/internal-error': {
          errorMessage.innerHTML = 'El ingreso de contraseña es obligatorio.';
          break;
        }
        case 'auth/wrong-password': {
          errorMessage.innerHTML = 'La contraseña ingresada es incorrecta.';
          break;
        }
        default: errorMessage.innerHTML = 'Por favor vuelve a intentarlo.';
          break;
      }
      return ('error');
    });
}

export const fEventLogin = () => {
  const signInForm = document.querySelector('#form-login');
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    eventLoginGlobal();
    obs();
  });
};

// Función para iniciar sesión con Google

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      sessionStorage.getItem(user);
      const uid = user.uid;
      setDoc(doc(db, 'userdata', uid), {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
        photo: user.photoURL,
        country: 'Ingresa tu país',
        description: 'Cuéntanos un poco sobre ti',
      });
      // ...
    }).catch((error) => error.code);
};

// INICIAR SESIÓN CON GOOGLE

export const fGoogleSignIn = () => {
  document.querySelector('#button-google').addEventListener('click', (e) => {
    e.preventDefault();
    googleSignIn();
    obs();
  });
};
