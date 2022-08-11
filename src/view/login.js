//  Vista de la página de ingreso

export default () => {
  /* document.getElementById("containerNav").style.visibility = "hidden"; */
  const loginView = `
  <div id = 'container-login'>
    <div class="fondo-logo">
      <img class="imagen-logo" src="https://i.pinimg.com/originals/54/cc/e0/54cce0449cfd4414fdc19b068a97e00a.png">
    </div>
    <form id = "form-login" class="form-login"> 
      <h1>Inicia sesión</h1>
      <p id="login-message"> Por favor inicia sesión para continuar </p>
      <input type="email" placeholder="Correo Electrónico" id="login-email">
      <input type="password" placeholder="Contraseña" id="login-password">
      <button type="submit" class="btnInicio" id="login-button"> INGRESAR </button>
      <p class ="p-login"> O ingresa con: </p>
      <div class="logo-container">
      <button id="button-google"><img src="https://w7.pngwing.com/pngs/543/934/png-transparent-google-app-logo-google-logo-g-suite-google-text-logo-circle.png">  Google </button>
    </div>
    <p> ¿No tienes cuenta? <a href="#/registro"> Regístrate </a> </p>
    </form>
    <div class="background-modal-error">
      <div class="modal-error">
        <p class="login-error"> Hay un error </p>
        <button class="close-modal btnInicio"> CERRAR </button>
      </div>
    <div>
  </div>`;
  const divLogin = document.createElement('div');
  divLogin.id = 'login';
  divLogin.innerHTML = loginView;
  return divLogin;
};
