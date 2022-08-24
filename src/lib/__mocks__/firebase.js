/* eslint-disable max-len */
export const initializeApp = jest.fn();

export const getAuth = jest.fn();

export const getFirestore = jest.fn();

export const collection = jest.fn();

export const doc = jest.fn();

export const signOut = jest.fn(() => Promise.resolve());

export const addDoc = jest.fn(() => Promise.resolve());

export const updateDoc = jest.fn(() => Promise.resolve({
  dok: {
    description: '¡Hola!',
  },
}));

export const onSnapshot = jest.fn(() => Promise.resolve());

/* **************** REGISTRO DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
// createUserWithEmailAndPassword
export const createUserWithEmailAndPassword = jest.fn(() => Promise.resolve({
  user: {
    email: 'prueba@gmail.com', //
    password: 'xxxxxx', //
  },
}));

// setDoc
export const setDoc = jest.fn(() => {
  Promise.resolve({
    country: 'country',
    description: 'description',
    preference: 'preference',
    email: 'email',
    genre: 'genre',
    name: 'name',
    uid: 'uid',
    photo: 'photo',
  });
});

/* **************** LOGIN DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
// signInWithEmailAndPassword
export const signInWithEmailAndPassword = jest.fn(() => Promise.resolve({
  user: {
    email: 'prueba@gmail.com', //
    password: 'xxxxxx', //
  },
}));

// signInWithPopup
export const signInWithPopup = jest.fn(() => Promise.resolve({
  user: {
    uid: '123er',
    email: 'prueba@gmail.com', //
    // password: 'xxxxxx', //
  },
}));

export const auth = { currentUser: { uid: '123er' } };

export const GoogleAuthProvider = jest.fn(() => ({ credentialFromResult: () => Promise.resolve() }));

export const onAuthStateChanged = (auth, jest.fn(() => Promise.resolve()));

/* **************** home ************************ */

export const getDoc = jest.fn();

export const Timestamp = { fromDate: (date) => date };
// setDoc
// export const addDoc = jest.fn(() => {
//   Promise.resolve({
//     birth: 'birth',
//     ountry: 'country',
//     description: 'description',
//     email: 'email',
//     password: 'password',
//     name: 'name',
//     username: 'username',
//     uid: 'uid',
//     photo: 'photo',
//   });
// });
// export const doc = {
//   country: 'country',
//   description: 'description',
//   email: 'email',
//   password: 'password',
//   uid: 'ddd',
//   photo: 'https://cdn-icons-png.flaticon.com/512/4222/4222009.png',
// };
