/* ************** AUTENTIFICACIÓN DE USUARIO - LOGIN CON CONTRASEÑA **************** */
// signInWithEmailAndPassword
export const eventLogin = jest.fn(() => Promise.resolve({
  user: {
    email: 'prueba@gmail.com', //
    password: 'xxxxxx', //
  },
}));
// OPCION VALIA export const eventLogin = jest.fn(() => Promise.resolve({ user: { } }));
// OPCION NO VALIDA export const eventLogin = jest.fn(() => Promise.resolve({ xxx: { } }));

/* **************** REGISTRO DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
// createUserWithEmailAndPassword
export const eventRegister = jest.fn(() => Promise.resolve({
  user: {
    email: 'prueba@gmail.com', //
    password: 'xxxxxx', //
  },
}));

export const initializeApp = jest.fn();
export const getAuth = jest.fn();
export const getFirestore = jest.fn();
export const collection = jest.fn();
export const GoogleAuthProvider = jest.fn();
export const FacebookAuthProvider = jest.fn();
export const doc = jest.fn();
export const onAuthStateChanged = jest.fn(() => Promise.resolve());
export const signOut = jest.fn(() => Promise.resolve());
export const signInWithPopup = jest.fn(() => Promise.resolve());
export const createUserWithEmailAndPassword = jest.fn(() => {
  Promise.resolve({
    user: {
      uid: 'uid',
    },
  });
  // eslint-disable-next-line prefer-promise-reject-errors
  Promise.reject({
    code: 'code',
  });
});
export const addDoc = jest.fn(() => Promise.resolve());
export const updateDoc = jest.fn(() => Promise.resolve());
export const setDoc = jest.fn((uid) => {
  Promise.resolve({
    email: 'email',
    password: 'password',
    name: 'name',
    username: 'username',
    uid,
    country: 'country',
    description: 'description',
    birth: 'birth',
    photo: 'photo',
  });
});
