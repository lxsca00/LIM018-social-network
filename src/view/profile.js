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
    <p id="user"> AQUI VA EL NOMBRE DE PERFIL </p>
    <p > @AQUI VA EL NOMBRE DE USUARIO</p>
    <div class="user-location">
        <img src="https://www.kindpng.com/free/location-icon/" class="img-location">
        <p>AQUÍ VA EL PAÍS</p>
    </div>
    <section class="about-user">
        <p class="user-description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui non augue feugiat pellentesque. Integer ornare est ligula, a integer.</p>
        <p class="subtitle"> Prefiero ver:</p>
        <p class="user-election"></p>
        <p class="subtitle"> Mi genero favorito es:</p>
        <p class="user-genre"></p>
    </section>
    <button id="editProfile" class="btnInicio"> EDITAR MI PERFIL </button>`;

  const divProfile = document.createElement('div');
  divProfile.classList = 'profile';
  divProfile.innerHTML = viewProfile;
  return divProfile;
};
