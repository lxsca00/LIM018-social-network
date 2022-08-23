export const initializeApp = jest.fn();

export const getAuth = jest.fn();

export const auth = { currentUser: { uid: '123er' } };
// export const auth = { currentUser: null };

// export const auth = jest.fn({ currentUser: { uid: '123er' } });

export const getFirestore = jest.fn();
export const collection = jest.fn();
// export const GoogleAuthProvider = jest.fn();
export const doc = jest.fn();

export const signOut = jest.fn(() => Promise.resolve());
// export const signInWithPopup = jest.fn(() => Promise.resolve());
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
    birth: 'birth',
    ountry: 'country',
    description: 'description',
    email: 'email',
    password: 'password',
    name: 'name',
    username: 'username',
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
// export const GoogleAuthProvider = jest.fn(() => {});
// eslint-disable-next-line max-len
export const GoogleAuthProvider = jest.fn(() => ({ credentialFromResult: () => Promise.resolve() }));
// eslint-disable-next-line max-len
// export const onAuthStateChanged = (auth, jest.fn(() => Promise.resolve({ user: { uid: '123er' } })));
export const onAuthStateChanged = (auth, jest.fn(() => Promise.resolve()));

// export const onAuthStateChanged = () => jest.fn();

// export const onAuthStateChanged = (jest.fn(() => Promise.resolve({ user: { xxx: 'cc' } })));
// eslint-disable-next-line max-len
// export const onAuthStateChanged = (auth, jest.fn((user) => { if (user) { Promise.resolve({ user: { xxx: 'cc' } }); } }));

// eslint-disable-next-line no-unused-vars
// export const onAuthStateChanged = jest.fn((auth, callback) => Promise.resolve({ user: {} }));
// export const onAuthStateChanged = (auth, (user) => { if (user) { console.log(user); } });

/* **************** home ************************ */
// export const uid = jest.fn({ uid: 'dd' });
// export const currentUser = jest.fn({ uid });
// export const auth = { currentUser: { uid: 'ddd' } };
export const getDoc = jest.fn();
// export const doc = jest.fn();
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
