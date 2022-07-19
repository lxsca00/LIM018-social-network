/* eslint-disable import/no-unresolved */
// aqui exportaras las funciones que necesites
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';

// Aquí van las credenciales

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const eventRegister = () => {
  // aqui tu codigo
  /* document.getElementById('btnRegister').addEventListener('click', (event) => {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const userUsername = document.getElementById('userUsername').value;
    const userCountry = document.getElementById('userCountry').value;
    const userBirth = document.getElementById('userBirth').value;
    console.log(userName + userUsername + userEmail + userPassword + userCountry + userBirth); */
  const signUpForm = document.querySelector('#registerForm');
  signUpForm.addEventListener('submit', () => {
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;
    console.log(userEmail, userPassword);
    console.log(firebaseConfig.apiKey);
    const auth = getAuth();
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log('user created successfully');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);
      });
  });
};

export const eventLogin = () => {

};
