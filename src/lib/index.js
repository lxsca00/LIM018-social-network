/* eslint-disable import/no-unresolved */
import {
  initializeApp,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';

import {
  getFirestore,
  collection,
  addDoc,
  doc, Timestamp,
  updateDoc,
  setDoc, getDoc,
  onSnapshot, query,
  orderBy,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';

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
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();

// Función para registrarse con email y contraseña

export const obs = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(`user ${uid} is loged`);
      window.location.hash = '#/principal';
      document.getElementById('header').style.visibility = 'visible';
    // ...
    } else {
    // User is signed out
      console.log('no user found');
      document.getElementById('header').style.visibility = 'hidden';
    }
  });
};

export function eventRegister(name, username, email, password, country, description, birth, photo) {
  createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const uid = user.uid;
      setDoc(doc(db, 'userdata', uid), {
        email, password, name, username, uid, country, description, birth, photo,
      });
      window.location.hash = '#/login';
    })
    .catch((error) => {
      const errorCode = error.code;
      const modalError = document.querySelector('.background-modal-error');
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

// Función para ingresar con email y contraseña

export const eventLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      sessionStorage.getItem(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const modalError = document.querySelector('.background-modal-error');
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
    });
};

// Función para cerrar la sesión

export function eventLogout() {
  signOut(auth).then(() => {
    sessionStorage.clear();
    return console.log('se cerró sesión exitosamente');
    // Sign-out successful.
  }).catch((error) => error);
}

// Función para iniciar sesión con Google

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
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
        username: '',
        birth: '',
        country: '',
        description: '',
      });
      // ...
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...);
      console.log(errorCode, errorMessage, credential);
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
      sessionStorage.getItem(user);
    })
    .catch((error) => error.code);
};

// Función para crear nueva colección de datos
export const savePost = (post) => {
  const user = auth.currentUser.uid;
  const email = auth.currentUser.email;
  addDoc(collection(db, 'post'), {
    posts: post,
    uid: user,
    correo: email,
    datePosted: Timestamp.fromDate(new Date()),
  });
};

// Actualizar los campos vacíos en el documento de cada usuario
export async function saveData(country, description, birth, preference, genre) {
  const user = auth.currentUser;
  const uid = user.uid;
  const docRef = doc(db, 'userdata', uid);
  await updateDoc(docRef, {
    country,
    description,
    birth,
    preference,
    genre,
  });
}

// Para obtener los datos del usuario activo en el home

export const activeUserHome = async () => {
  const user = auth.currentUser;
  const uid = user.uid;
  const docRef = doc(db, 'userdata', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const userName = document.querySelector('.name-profile');
    userName.textContent = docSnap.data().name;
    const userEmail = document.querySelector('#user-profile');
    userEmail.textContent = docSnap.data().email;
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
};

// Para obtener los datos del usuario activo en tiempo real en el profile

export const activeUserProfile = async () => {
  const user = auth.currentUser;
  const uid = user.uid;
  onSnapshot(
    doc(db, 'userdata', uid),
    { includeMetadataChanges: true },
    (dok) => {
      // console.log(dok.data());
      const userName = document.querySelector('.name-profile');
      userName.textContent = dok.data().name;
      const userEmail = document.querySelector('.email-profile');
      userEmail.textContent = dok.data().email;
      const userCountry = document.querySelector('#user-country');
      userCountry.textContent = dok.data().country;
      const description = document.querySelector('.user-description');
      description.textContent = dok.data().description;
      const userElection = document.querySelector('.user-election');
      userElection.textContent = dok.data().preference;
      const userGenres = document.querySelector('.user-genre');
      userGenres.textContent = dok.data().genres;
    },
  );
};

// Obtener los post en tiempo real

export const onGetPosts = async () => {
  const q = query(collection(db, 'post'), orderBy('datePosted', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((dok) => {
      posts.push(Object.assign(dok.data(), { id: dok.id }));
    });
    const home = document.getElementById('all-publications');
    home.innerHTML = '';
    posts.forEach((post) => {
      home.innerHTML += `
     <div class="old-publication" >
      <p class="user-name-post"> ${post.correo} </p>
      <input type="text" class="old-comment" value="${post.posts}">
      <div class="container-button">
        <div class="emojis">
          <input type="button" title="Click to coment" value="🍿"  class="button-emoji" >
          <input type="button" title="Click to coment" value="🤍"  class="button-emoji" >
        </div>
      <input type="button" title="Click to coment" value="Comentar "  class="comment-button" >
      </div>
        </div>
    </div>`;
    });
  });
};

// Para obtener foto de perfil

/* export async function photoUser() {
  const user = auth.currentUser;
  const uid = user.uid;
  const docRef = doc(db, 'userdata', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const userPhoto = document.querySelector('.user-photo');
    userPhoto.src = docSnap.data().photo;
    if (userPhoto === '') {
      userPhoto.src = 'pop2.png';
    }
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
} */
