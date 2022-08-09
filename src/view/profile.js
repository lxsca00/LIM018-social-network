// Vista de la página de perfil

export default () => {
  const viewProfile = `
    <div class="container-user-photo">
        <div class="photo-user">
            <img src="https://cdn-icons-png.flaticon.com/512/4222/4222009.png" class="user-photo">
        </div>
        <label for="edit" class="photo-change-user"> <img src="https://cdn-icons-png.flaticon.com/512/104/104668.png" class="change-photo"> </label>
        <input id="edit" accept="image/jpeg" type="file" class="cargar-foto" >
    </div>
    <p class="name-profile"> AQUI VA EL NOMBRE DE PERFIL </p>
    <p class="email-profile"> AQUI VA EL CORREO DEL USUARIO</p>
    <div class="user-location">
        <p>📍</p>
        <p id="user-country">AQUÍ VA EL PAÍS</p>
    </div>
    <section class="about-user">
        <p class="user-description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui non augue feugiat pellentesque. Integer ornare est ligula, a integer.</p>
        <p class="subtitle"> Prefiero ver:</p>
        <p class="user-election"></p>
        <p class="subtitle"> Mi genero favorito es:</p>
        <p class="user-genre"></p>
    </section>
    <button id="editProfile" class="btnInicio"> EDITAR MI PERFIL </button>
    <div class="modal-edit">
      <div class="modal-card">
        <p> EDITAR PERFIL</p>
        <form id="edit-profile">
          <select id="select-country"> </select>
          <input type="date" id="select-birth" max="2009-01-01"> </input>
          <input type="text" id="change-description" placeholder="Aquí va tu descripción">
          <select id="change-preferences">
            <option value=""> ¿Qué prefieres ver? </option>
            <option value="Peliculas"> Peliculas </option>
            <option value="Series"> Series </option>
          </select>
          <input type="text" id="change-genre" placeholder="¿Cuáles son tus géneros favoritos?">
          <button type="button" id="save-changes" class="btnInicio"> GUARDAR CAMBIOS </button>
          <button id="close" class="btnInicio"> CERRAR </button>
        </form>
      </div>
    <div>`;

  const divProfile = document.createElement('div');
  divProfile.classList = 'profile';
  divProfile.innerHTML = viewProfile;
  return divProfile;
};
