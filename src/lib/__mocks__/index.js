export const initializeApp = jest.fn();

export const getAuth = jest.fn();

export const getFirestore = jest.fn();
export const collection = jest.fn();
export const GoogleAuthProvider = jest.fn();
export const FacebookAuthProvider = jest.fn();
export const doc = jest.fn();
export const onAuthStateChanged = jest.fn(() => Promise.resolve());

export const eventLogin = jest.fn(() => Promise.resolve({
  user: {
    email: 'prueba@gmail.com',
  },
}));

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
    uid,
    country: 'country',
    description: 'description',
    birth: 'birth',
    photo: 'photo',
  });
});
