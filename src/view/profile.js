// Vista de la página de perfil
import {
  auth, doc, db, updateDoc, onSnapshot,
} from '../lib/firebase.js';

import { countries } from './countries.js';

const userImg = (img) => (img !== '' ? img : 'https://cdn-icons-png.flaticon.com/512/4222/4222009.png');

export const activeUserProfile = async () => {
  const uid = auth.currentUser.uid;
  onSnapshot(
    doc(db, 'userdata', uid),
    { includeMetadataChanges: true },
    (dok) => {
      const topInfoContainer = document.querySelector('.top-user-info');
      topInfoContainer.innerHTML = '';
      const userImgProfile = dok.data().photo;
      const pic = userImg(userImgProfile);
      const topUserInfo = `
      <div class="container-user-photo">
        <div class="photo-user">
            <img src=${pic} class="user-photo">
        </div>
        <label for="edit" class="photo-change-user"> <img src="https://cdn-icons-png.flaticon.com/512/104/104668.png" class="change-photo"> </label>
        <input id="edit" accept="image/jpeg" type="file" class="cargar-foto" >
      </div>
      <p class="name-profile"> ${dok.data().name} </p>
      <p class="email-profile"> ${dok.data().email} </p>
      <div class="user-location">
        <p>📍</p>
        <p id="user-country"> ${dok.data().country} </p>
      </div>`;
      topInfoContainer.insertAdjacentHTML('beforeend', topUserInfo);
      const aboutUserContainer = document.querySelector('.about-user');
      aboutUserContainer.innerHTML = '';
      const aboutUser = `
      <p class="user-description"> ${dok.data().description} </p>
      <p class="subtitle"> Prefiero ver:</p>
      <p class="user-election"> ${dok.data().preference} </p>
      <p class="subtitle"> Mi genero favorito es:</p>
      <p class="user-genre"> ${dok.data().genre} </p>`;
      aboutUserContainer.insertAdjacentHTML('beforeend', aboutUser);
      const modalCard = document.querySelector('.modal-card');
      modalCard.innerHTML = '';
      const modalContent = `
      <p> EDITAR PERFIL</p>
      <form id="edit-profile">
        <select id="select-country"> </select>
        <input type="text" id="change-description" value="${dok.data().description}" placeholder="Aquí va tu descripción">
        <select id="change-preferences">
          <option value=""> ¿Qué prefieres ver? </option>
          <option value="Peliculas"> Peliculas </option>
          <option value="Series"> Series </option>
        </select>
        <input type="text" id="change-genre" value="${dok.data().genre}" placeholder="¿Cuáles son tus géneros favoritos?">
        <button type="button" id="save-changes"> GUARDAR CAMBIOS </button>
        <button id="close" class="btnInicio"> CERRAR </button>
      </form>
      `;
      modalCard.insertAdjacentHTML('beforeend', modalContent);
    },
  );
};

export async function saveData(country, description, preference, genre) {
  const uid = auth.currentUser.uid;
  const docRef = doc(db, 'userdata', uid);
  await updateDoc(docRef, {
    country,
    description,
    preference,
    genre,
  });
}

export const editProfile = () => {
  document.getElementById('editProfile').addEventListener('click', (e) => {
    e.preventDefault();
    const containerModal = document.querySelector('.background-modal');
    containerModal.style.visibility = 'visible';
    const selectCountry = document.querySelector('#select-country');
    countries.forEach((userCountry) => {
      const category = `<option value="${userCountry}"> ${userCountry} </option>`;
      selectCountry.insertAdjacentHTML('beforeend', category);
    });
    selectCountry.children[0].disabled = true;
    const selectPreference = document.querySelector('#change-preferences');
    selectPreference.children[0].disabled = true;
    document.querySelector('#save-changes').addEventListener('click', () => {
      const country = selectCountry.options[selectCountry.selectedIndex].value;
      const preference = selectPreference.options[selectPreference.selectedIndex].value;
      const newDescription = document.getElementById('change-description').value;
      const favGenre = document.querySelector('#change-genre').value;
      saveData(country, newDescription, preference, favGenre);
      containerModal.style.visibility = 'hidden';
    });
    document.querySelector('#close').addEventListener('click', () => {
      e.preventDefault();
      containerModal.style.visibility = 'hidden';
    });
  });
};

export const profileTemplate = () => {
  const viewProfile = `
  <section class="top-user-info"> </section>
  <section class="about-user"> </section>
  <button id="editProfile"> EDITAR MI PERFIL </button>
  <button id="return-home"> <a href="#/home"> VOLVER AL HOME </a> </button>
  <div class="background-modal">
    <div class="modal-card">
    </div>
   <div>`;
  const divProfile = document.createElement('div');
  divProfile.classList = 'profile';
  divProfile.innerHTML = viewProfile;
  return divProfile;
};
