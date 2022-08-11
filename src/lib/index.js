/* eslint-disable max-len */
import {
  // initializeApp,
  //
  getAuth, // no promise
  onAuthStateChanged, // es promesa (if-else)
  createUserWithEmailAndPassword, // es promesa // .then y .catch se usan para llamar a una promesa
  signInWithEmailAndPassword, // es promesa
  signOut, // es promesa
  signInWithPopup, // es promesa
  GoogleAuthProvider, // no promise?
  FacebookAuthProvider, // no promise?
  //
  getFirestore, // no promise
  collection, // no promise
  addDoc, // es promesa (v:rapido)
  doc, // no promise
  Timestamp,
  updateDoc, //  es promesa (await)
  setDoc, //  es promesa (await)
  getDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc, // promesa
  // Initialize Firebase
  app,
} from './firebase.js';

/* import {
  getAnalytics,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js'; */

// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();

/* ************** AUTENTIFICACIÓN DE USUARIO - LOGIN CON CONTRASEÑA **************** */
// even
export const eventLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);
// Función para ingresar con email y contraseña

// export const eventLogin = (email, password) => {
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       sessionStorage.getItem(user);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const modalError = document.querySelector('.background-modal-error');
//       modalError.style.visibility = 'visible';
//       const errorMessage = document.querySelector('.login-error');
//       switch (errorCode) {
//         case 'auth/user-not-found': {
//           errorMessage.innerHTML = 'No existe ningún usuario registrado con este email.';
//           break;
//         }
//         case 'auth/invalid-email': {
//           errorMessage.innerHTML = 'Proporcione una dirección de correo válida.';
//           break;
//         }
//         case 'auth/internal-error': {
//           errorMessage.innerHTML = 'El ingreso de contraseña es obligatorio.';
//           break;
//         }
//         case 'auth/wrong-password': {
//           errorMessage.innerHTML = 'La contraseña ingresada es incorrecta.';
//           break;
//         }
//         default: errorMessage.innerHTML = 'Por favor vuelve a intentarlo.';
//           break;
//       }
//     });
// };

/* **************** REGISTRO DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
// even
// eslint-disable-next-line no-unused-vars
// export const eventRegister = (name, username, email, password, country, description, birth, photo) => createUserWithEmailAndPassword(email, password);
// export const eventSetDoc = (uid, name, username, email, password, country, description, birth, photo) => setDoc(doc(db, 'userdata', uid), {
//   email, password, name, username, uid, country, description, birth, photo,
// });

// eslint-disable-next-line max-len
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

// OBSERVADOR
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
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
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

// PARA  BORRAR POST DEL HOME
export const deletePost = (id) => deleteDoc(doc(db, 'post', id)); // deleteDoc es promesa de firestore

export function deletePosts() {
  const btnsDelete = document.querySelectorAll('.comment-button');
  console.log(btnsDelete);
  btnsDelete.forEach((boton) => {
    boton.addEventListener('click', (event) => { // al ejecutar un btn (con clic p.e.) y para traer info del btn se usa un evento
      // 1. si queremos estructurar el objeto event es = { target:{ dataset } }
      console.log(event); // >see to event object.I need target property>target.dataset>dataset.id
      console.log(event.target.dataset.id);
      deletePost(event.target.dataset.id);
      // 2. si queremos estructurar el objeto event.target.dataset.id es = dataset.id
    });
  });
}

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
      <button title="Delete post" class="comment-button" data-id='${post.id}'>Delete</button>  // data-xxxx (propiedad de html que guarda datos dentro del boton)
      </div>
        </div>
    </div>`;
    });
    deletePosts();
  });
};
