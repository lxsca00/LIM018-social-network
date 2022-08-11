// Vista del muro donde se ven las publicaciones
import { activeUserHome, onGetPosts } from '../lib/index.js';

export default () => {
  const viewHome = ` 
  <section class="container-principal">
    <div class="information-user"> 
    </div>
    <div class="container-publications">
    <form class="form-publication" id="form-publication">
      <input type="text" class="comment" id ="comment" placeholder="¿Qué nos quieres decir?">
        <div class="container-button">
          <label for="upload" class="photo-change-post"> <img src="https://cdn-icons-png.flaticon.com/512/16/16410.png" class="upload-photo"> </label>
          <input id="upload" accept="image/jpeg" type="file" class="cargar-foto" >
          <input type="submit" title="Click to post" value="Compartir" class="post-button" id='toShare' >
        </div>
    </form>
    <div class="all-publications" id='all-publications'> </div>
    <div class="background-modal-edit">
      <div class="modal-post-edit">
        <p> EDITAR POST </p>
        <input type="text" id="edit-post" placeholder="Edita tu post"> </input>
        <button class="save-post btnInicio"> GUARDAR CAMBIOS </button>
        <button class="close-modal btnInicio"> CERRAR </button>
      </div>
    <div>
    </div>  
  </section>`;
  activeUserHome();
  onGetPosts();
  const divElem = document.createElement('div');
  divElem.id = 'home';
  divElem.innerHTML = viewHome;
  return divElem;
};
