import {
  createUserWithEmailAndPassword, // es promesa // .then y .catch se usan para llamar a una promesa
  auth,
  setDoc, //  es promesa (await)
  doc, // no promise
  db, // no promise
} from '../lib/firebase.js';

// Vista de la página de registro

export default () => {
  const viewRegister = `
  <div id = 'container-register'>
    <div class="fondo-logo">
      <img class="imagen-logo" src="https://i.pinimg.com/originals/54/cc/e0/54cce0449cfd4414fdc19b068a97e00a.png">
    </div>
    <form class="register-form" id="register-form">
      <h1> Regístrate </h1>
      <p class="register-message"> Por favor registrate para iniciar sesión </p>
      <input id="user-name" type="text" placeholder="Nombre">
      <input id="user-email" type="email" placeholder="Correo electrónico">
      <input id="user-password" type="password" placeholder="Contraseña">
      <button id="register-button" class="btnInicio" type="submit"> REGISTRARME </button>
      <p> ¿Ya tienes cuenta? <a href="#/login"> Inicia sesión </a> </p>
    </form>
    <div class="background-modal">
      <div class="modal-error">
        <p class="register-error"> Hay un error </p>
        <button class="close-modal btnInicio"> CERRAR </button>
      </div>
    <div>
  </div>`;
  const divRegister = document.createElement('div');
  divRegister.id = 'register';
  divRegister.innerHTML = viewRegister;
  return divRegister;
};

// Función para registrarse con email y contraseña
export function eventRegister(name, email, password, country, description, photo) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const uid = user.uid;
      setDoc(doc(db, 'userdata', uid), {
        email, password, name, uid, country, description, photo,
      });
      window.location.hash = '#/login';
    })
    .catch((error) => {
      const errorCode = error.code;
      const modalError = document.querySelector('.background-modal');
      modalError.style.visibility = 'visible';
      const errorMessage = document.querySelector('.register-error');
      switch (errorCode) {
        case 'auth/email-already-in-use': {
          errorMessage.innerHTML = 'Email en uso, intenta iniciar sesión.';
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
        case 'auth/weak-password': {
          errorMessage.innerHTML = 'Tu contraseña debe tener al menos 6 caracteres.';
          break;
        }
        default: errorMessage.innerHTML = 'Vuelve a intentarlo.';
          break;
      }
    });
}

// REGISTRO DE USUARIO

export const fEventRegister = () => {
  const signUpForm = document.querySelector('#register-form');
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const name = document.getElementById('user-name').value;
    const country = 'Ingresa tu país';
    const description = 'Cuéntanos un poco sobre ti';
    const photo = '';
    eventRegister(name, email, password, country, description, photo);
  });
};
