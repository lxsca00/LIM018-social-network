// aqui exportaras las funciones que necesites
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';

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
    console.log('submiting');
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;
    console.log(userEmail, userPassword);
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
  
}
