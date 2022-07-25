// Vista del muro donde se ven las publicaciones
export default () => {
  const viewHome = ` 
  <section class="container-principal">
    <div class="information-user"> 
      <div class="container-user-photo">
        <div class="photo-user">
          <img src="https://cdn-icons-png.flaticon.com/512/4222/4222009.png" class="user-photo">
        </div>
        <label for="edit" class="photo-change-user"> <img src="https://cdn-icons-png.flaticon.com/512/104/104668.png" class="change-photo"> </label>
        <input id="edit" accept="image/jpeg" type="file" class="cargar-foto" >
      </div>
      <div class="data-user">
        <p> AQUI VA EL NOMBRE DE PERFIL </p>
        <p> @AQUI VA EL NOMBRE DE USUARIO</p>
      </div>
    </div>
    <div class="all-publications" id='all-publications'>
      <div class="publication" id="publication">
        <input type="text" class="comment" id ="comment">
        <div class="container-button">
            <label for="upload" class="photo-change-post"> <img src="https://cdn-icons-png.flaticon.com/512/16/16410.png" class="upload-photo"> </label>
            <input id="upload" accept="image/jpeg" type="file" class="cargar-foto" >
            <input type="button" title="Click to post" value="Compartir"  class="post-button" id='toShare' >
        </div>
      </div>
    </div>  
  </section>`;
  const divElem = document.createElement('div');
  divElem.id = 'home';
  divElem.innerHTML = viewHome;
  return divElem;
};
