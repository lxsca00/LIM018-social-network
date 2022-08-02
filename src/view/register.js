// Vista de la página de registro

export default () => {
  const viewRegister = `
  <div class = 'container-register'>
    <img class="image-register" src="https://i.pinimg.com/originals/54/cc/e0/54cce0449cfd4414fdc19b068a97e00a.png">
    <form class="register-form" id="register-form">
      <h1> Regístrate </h1>
      <p class="register-message"> Por favor registrate para iniciar sesión </p>
      <input id="user-name" type="text" placeholder="Nombre">
      <input id="user-username" type="text" placeholder="Nombre de usuario">
      <input id="user-email" type="text" placeholder="Correo electrónico">
      <input id="user-password" type="password" placeholder="Contraseña">
      <select id="user-country" name="select">
        <option disabled selected>Selecciona tu país</option> 
      </select>
      <input id="user-birth" type="date" placeholder="Fecha de nacimiento">
      <button id="register-button" type="submit"> Registrarme </button>
      <p> ¿Ya tienes cuenta? <a href="#/login"> Inicia sesión </a> </p>
      </form>
  </div>`;
  const divRegister = document.createElement('div');
  divRegister.id = 'register';
  divRegister.innerHTML = viewRegister;
  return divRegister;
};
