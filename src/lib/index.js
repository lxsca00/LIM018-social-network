import {
  // initializeApp,
  // auth,
  // db, // no promise
  onAuthStateChanged, // es promesa (if-else)
  signOut, // es promesa
  // signInWithPopup, // es promesa
  // GoogleAuthProvider, // no promise?
  collection, // no promise
  addDoc, // es promesa (v:rapido)
  // doc, // no promise
  Timestamp,
  updateDoc, //  es promesa (await)
  // setDoc, //  es promesa (await)
  getDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc, // promesa
  // Initialize Firebase

  // REGISTER
  createUserWithEmailAndPassword, // es promesa // .then y .catch se usan para llamar a una promesa
  setDoc, //  es promesa (await)
  db, // no promise
  doc, // no promise
  auth,
} from './firebase.js';

/* **************** REGISTRO DE USUARIO - EMAIL Y CONTRASEÑA ************************ */
// eslint-disable-next-line max-len
export const eventRegisterFirebase = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const eventSetDoc = (uid, name, email, password, country, description, photo) => setDoc(doc(db, 'userdata', uid), {
  email, password, name, uid, country, description, photo,
});
/* **************** ***************************************** ************************ */

// OTRAS FUNCIONES

// Para obtener los datos del usuario activo en tiempo real en el profile // AQUI
export const obs = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(`user ${uid} is loged`);
      window.location.hash = '#/home';
      document.getElementById('header').style.visibility = 'visible';
    // ...
    } else {
    // User is signed out
      console.log('no user found');
      document.getElementById('header').style.visibility = 'hidden';
    }
  });
};

// Función para cerrar la sesión // AQUI

export function eventLogout() {
  signOut(auth).then(() => {
    sessionStorage.clear();
    return console.log('se cerró sesión exitosamente');
    // Sign-out successful.
  }).catch((error) => error.code);
}

// GUARDAR NUEVOS POST EN LA BASE DE DATOS
export const savePost = (post) => {
  const user = auth.currentUser.uid;
  const email = auth.currentUser.email;
  addDoc(collection(db, 'post'), {
    posts: post,
    uid: user,
    correo: email,
    datePosted: Timestamp.fromDate(new Date()),
    likes: [],
  });
};

// PARA  BORRAR POST DEL HOME
export const deletePost = (id) => deleteDoc(doc(db, 'post', id)); // deleteDoc es promesa de firestore
const closeModalDelete = () => {
  const modalEdit = document.querySelector('.close-modalDelete');
  modalEdit.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.background-modal-edit').style.visibility = 'hidden';
  });
};
export function deletePosts() {
  const btnsDelete = document.querySelectorAll('.comment-button');
  // console.log(btnsDelete);
  btnsDelete.forEach((boton) => {
    boton.addEventListener('click', (event) => { // al ejecutar un btn (con clic p.e.) y para traer info del btn se usa un evento
      // 1. si queremos estructurar el objeto event es = { target:{ dataset } }
      // console.log(event); >see to event object.I need target property>target.dataset>dataset.id
      // console.log(event.target.dataset.id);
      const modalError = document.querySelector('.background-modal-delete');
      modalError.style.visibility = 'visible';
      const deleteYes = document.getElementById('deleteYes');
      const deleteNo = document.getElementById('deleteNo');
      deleteYes.addEventListener('click', (e) => {
        e.preventDefault();
        const containerModal = document.querySelector('.background-modal-delete');
        containerModal.style.visibility = 'hidden';
        deletePost(event.target.dataset.id);
      });
      closeModalDelete();
      deleteNo.addEventListener('click', (e) => {
        e.preventDefault();
        const containerModal = document.querySelector('.background-modal-delete');
        containerModal.style.visibility = 'hidden';
      });
    });
  });
}

// EDITAR POST DEL HOME

const closeModalEdit = () => {
  const modalEdit = document.querySelector('.close-modal');
  modalEdit.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.background-modal-edit').style.visibility = 'hidden';
  });
};

export const editPost = () => {
  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach((edit) => {
    edit.addEventListener('click', (event) => {
      document.querySelector('.background-modal-edit').style.visibility = 'visible';
      const saveButton = document.querySelector('.save-post');
      saveButton.addEventListener('click', async () => {
        const id = event.target.dataset.id;
        const docRef = doc(db, 'post', id);
        const newPost = document.querySelector('#edit-post').value;
        await updateDoc(docRef, {
          posts: newPost,
        });
        document.querySelector('.background-modal-edit').style.visibility = 'hidden';
      });
      closeModalEdit();
    });
  });
};

// LIKES

export function shareLike() {
  const buttonLike = document.querySelectorAll('.button-emoji');
  buttonLike.forEach((boton) => {
    boton.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      console.log(id);
      const docRef1 = doc(db, 'post', id);
      const docSnap = await getDoc(docRef1);
      console.log(docSnap);
      if (docSnap.exists()) {
        const likesData = docSnap.data().likes;
        const user = auth.currentUser;
        if (likesData.includes(user.uid)) {
          updateDoc(docRef1, {
            likes: likesData.filter((item) => (item !== user.uid)),
          });
        } else {
          updateDoc(docRef1, {
            likes: [...likesData, user.uid],
          });
        }
        console.log(likesData);
      }
    });
  });
}

// Obtener los post en tiempo real
export const onGetPosts = async () => {
  const user = auth.currentUser;
  const q = query(collection(db, 'post'), orderBy('datePosted', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((dok) => {
      posts.push(Object.assign(dok.data(), { id: dok.id }));
    });
    const home = document.getElementById('all-publications');
    home.innerHTML = '';
    posts.forEach((post) => {
      let onePost = `
     <div class="old-publication" >
        <p class="user-name-post"> ${post.correo} </p>
        <p class="old-comment"> ${post.posts} </p>
        <div class="container-post-button">
          <div class="emojis">
            <input type="button" title="Click to coment" value="🤍"  class="button-emoji"   data-id='${post.id}'>
            <button class="edit-button inputlike"> ${post.likes.length} </button>
          </div>`;
      if (post.uid === user.uid) {
        onePost += `<button title="Edit post" class="edit-button" data-id='${post.id}'>Edit</button>
            <button title="Delete post" class="comment-button" data-id='${post.id}'>Delete</button>  <!--data-xxxx (propiedad de html que guarda datos dentro del boton)-->
          </div>
        </div>
        <div class="background-modal-delete">
          <div class="modal-delete">
            <p class="login-delete"> ¿Estas seguro de borrar este post? <img src="https://emoji.slack-edge.com/T0NNB6T0R/sad_parrot/63bb67f63f6b6d9d.gif"> </p>
            <div class="btns_delete">
              <button class="close-modalDelete btnDelete" id='deleteYes'> SI </button>
              <button class="close-modalDelete btnDelete" id='deleteNo'> NO </button>
            </div>
          </div>
        <div>
        </div>`;
      } else {
        onePost += '</div>';
      }
      home.innerHTML += onePost;
    });
    shareLike();
    deletePosts();
    editPost();
  });
};

// PERFIL DEL USUARIO EN HOME

const userImg = (img) => (img !== '' ? img : 'https://cdn-icons-png.flaticon.com/512/4222/4222009.png');

export const activeUserHome = async () => {
  const user = auth.currentUser;
  const uid = user.uid;
  const docRef = doc(db, 'userdata', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const userImgProfile = docSnap.data().photo;
    const pic = userImg(userImgProfile);
    const homeProfile = `
    <div class="container-user-photo">
      <div class="photo-user">
        <img src='${pic}' class="user-photo">
      </div>
    </div>
    <div class="data-user">
      <p class="name-profile"> ${docSnap.data().name} </p>
      <p id="user-profile"> ${docSnap.data().email} </p>
    </div>`;
    const containerProfile = document.querySelector('.information-user');
    containerProfile.insertAdjacentHTML('beforeend', homeProfile);
  }
};
