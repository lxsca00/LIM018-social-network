import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';

//credenciales
const firebaseConfig = {
  apiKey: "AIzaSyACc51LXOjvtbxdJZvHc4gM_0y2VgVoN-U",
  authDomain: "popcorn-zone-698e0.firebaseapp.com",
  databaseURL: "https://popcorn-zone-698e0-default-rtdb.firebaseio.com",
  projectId: "popcorn-zone-698e0",
  storageBucket: "popcorn-zone-698e0.appspot.com",
  messagingSenderId: "801567687163",
  appId: "1:801567687163:web:19c68d5004a3fb78210b5e",
  measurementId: "G-XDE8KYM2TV"
};

//-----------------iniciando firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore();
/*const analytics = getAnalytics(app);*/


//-----------------creando const para guardar datos en firestore
export const saveUser = (name, username,) => {
  addDoc(collection(db, "userdata"),{name,username});
}
    
export const comentario = (comentariouser) =>
    addDoc(collection(db, "userdata"),{comentariouser});
    
  window.addEventListener('DOMContentLoaded', () =>{

    })
    
    
// -------------------evento registro de datos
export const eventRegister = () => {
  const signUpForm = document.querySelector('#register-form');
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const auth = getAuth();                                            //autentificacion
    const email = document.getElementById('user-email').value;         //datos de user
    const password = document.getElementById('user-password').value;
    const name = document.getElementById('user-name').value;
    const username = document.getElementById('user-username').value;
    createUserWithEmailAndPassword(auth, email, password)              //creacion de usuario
      .then((userCredential) => {                                       
        //console.log (userCredential)
        addDoc(collection(db, "userdata"),{name,username,email,password}); //creacion db firestore del usuario
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(`user created successfully: ${user}`);
        sessionStorage.getItem(user);
        window.location.hash = '#/login';
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        const mensajealert = (`Intentalo Nuevamente : ${errorMessage}`);  //mensaje error registro
        alert(mensajealert);
      });
      })}

      export const eventLogin = () => {
        const signInForm = document.querySelector('#form-login');
        signInForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const auth = getAuth();
          const email = document.getElementById('login-email').value;
          const password = document.getElementById('login-password').value;
          console.log(email, password);
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              // ...
              console.log(`${userCredential}, signed in`);
              sessionStorage.getItem(user);
              window.location.hash = '#/principal';
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorMessage);
            });
        });
      };
      
      export const eventLogout = () => {
        const logout = document.querySelector('#logout');
        const auth = getAuth();
        logout.addEventListener('click', (e) => {
          e.preventDefault();
          signOut(auth).then(() => {
            window.location.hash = '#/login';
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
            console.log('something happened');
          });
          sessionStorage.clear();
        });
      };
      
      // FUNCION PARA COMPARTIR UN POST EN HOME
      export function sharePost()  {
        
        const toShare = document.getElementById('toShare');
        let numberPost = 0;
        toShare.addEventListener('click', () => {
          const oldPost = `
            <div class="old-publication" >
              <p class="user-name-post">AQUI VA EL NOMBRE DE USUARIO</p>
              <input type="text" class="old-comment" id="inputcomentario">
              <div class="container-button">
                <div class="emojis">
                  <input type="button" title="Click to coment" value="🍿"  class="button-emoji" >
                  <input type="button" title="Click to coment" value="🤍"  class="button-emoji" >
                </div>
               <input type="button" title="Click to coment" value="Comentar "  class="comment-button" >
              </div>
                </div>
            </div>`;
            const parentPost = document.getElementById('all-publications');
            const divElem = document.createElement('div');
            // eslint-disable-next-line max-len
            // se debe almacenar en un solo div porque sino ('node') to Node.appendChild must be an instance of Node
            numberPost += 1;
            divElem.id = `post ${numberPost}`;
            divElem.innerHTML = oldPost;
            return parentPost.appendChild(divElem);
            
            
            })
         
          }

