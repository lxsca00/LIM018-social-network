// Vista de la página de registro

export default () => {
  const viewRegister = `
  <div id = 'container-register'>
    <div class="fondo-logo">
      <img class="imagen-logo" src="https://i.pinimg.com/originals/54/cc/e0/54cce0449cfd4414fdc19b068a97e00a.png">
    </div>
    <form class="register-form" id="register-form">
      <h1> Regístrate </h1>
      <p class="register-message"> Por favor registrate para iniciar sesión </p>
      <input id="user-name" type="text" placeholder="Nombre">
      <input id="user-username" type="text" placeholder="Nombre de usuario">
      <input id="user-email" type="email" placeholder="Correo electrónico">
      <input id="user-password" type="password" placeholder="Contraseña">
      <button id="register-button" class="btnInicio" type="submit"> REGISTRARME </button>
      <p> ¿Ya tienes cuenta? <a href="#/login"> Inicia sesión </a> </p>
    </form>
    <div class="background-modal-error">
      <div class="modal-error">
        <p class="register-error"> Hay un error </p>
        <button class="close-modal btnInicio"> CERRAR </button>
      </div>
    <div>
  </div>`;
  const divRegister = document.createElement('div');
  divRegister.id = 'register';
  divRegister.innerHTML = viewRegister;
  return divRegister;
};
