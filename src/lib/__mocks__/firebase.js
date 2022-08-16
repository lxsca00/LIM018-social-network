export const initializeApp = jest.fn();

export const getAuth = jest.fn();

export const getFirestore = jest.fn();
export const collection = jest.fn();
export const GoogleAuthProvider = jest.fn();
export const doc = jest.fn();
export const onAuthStateChanged = jest.fn(() => Promise.resolve());

export const eventLogin = jest.fn(() => Promise.resolve({
  user: {
    email: 'prueba@gmail.com',
  },
}));

export const signOut = jest.fn(() => Promise.resolve());
export const signInWithPopup = jest.fn(() => Promise.resolve());
export const addDoc = jest.fn(() => Promise.resolve());
export const updateDoc = jest.fn(() => Promise.resolve());

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
/* **************** ***************************************** ************************ */
