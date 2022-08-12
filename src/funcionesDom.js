// Este es el punto de entrada de tu aplicacion // RELACION CON EL DOM

import {
  eventRegister,
  eventLogin,
  obs,
  eventLogout,
  googleSignIn,
  savePost,
  // changePhoto,
} from './lib/index.js';

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
  document.getElementById('home-li').style.display = 'none';
  document.getElementById('perfil-li').style.display = 'none';
  document.getElementById('logout').style.display = 'none';
  document.getElementById('registro-li').style.display = 'block';
  document.getElementById('login').style.display = 'block';
  const signInForm = document.querySelector('#form-login');
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    eventLoginGlobal();
    obs();
  });
};

// FUNCION PARA REDIRIGIRSE DESDE EL INICIO

export const inicioPage = () => {
  document.getElementById('registrarmeInicio-button').addEventListener('click', () => {
    window.location.hash = '#/registro';
  });
  document.getElementById('loginInicio-button').addEventListener('click', () => {
    window.location.hash = '#/login';
  });
};

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

// CERRAR MODALES DE ERROR

export const closeModal = () => {
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
};

// INICIAR SESIÓN CON GOOGLE

export const fGoogleSignIn = () => {
  document.querySelector('#button-google').addEventListener('click', (e) => {
    e.preventDefault();
    googleSignIn();
    obs();
  });
};

// CERRAR SESIÓN

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  eventLogout();
  window.location.hash = '#/';
  document.getElementById('logout').style.display = 'none';
});

// FUNCION PARA COMPARTIR UN POST EN HOME

export function fSharePost() {
  document.getElementById('home-li').style.display = 'block';
  document.getElementById('perfil-li').style.display = 'block';
  document.getElementById('logout').style.display = 'block';
  document.getElementById('registro-li').style.display = 'none';
  document.getElementById('login').style.display = 'none';
  const formPublication = document.querySelector('#form-publication');
  formPublication.addEventListener('submit', (e) => {
    e.preventDefault();
    const postContent = document.querySelector('#comment').value;
    savePost(postContent);
    formPublication.reset();
  });
}

// Función para que aparezca un modal para editar perfil
