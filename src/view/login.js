//  Vista de la página de ingreso

export default () => {
  /*document.getElementById("containerNav").style.visibility = "hidden"; */
  const loginView = `
  <div id = 'container-login'>
    <div class="h2-login">
      <h2 class="text-center"> ¡Bienvenidos a PopcornZone! </h2>
    </div>
    <img class="image-login" src="https://i.pinimg.com/originals/54/cc/e0/54cce0449cfd4414fdc19b068a97e00a.png">
    <form id = "form-login" class="form-login"> 
      <h1 class="h1-login">Inicia Sesión</h1>
      <input type="email" placeholder="Correo Electrónico" id="login-email" >
      <input type="password"  placeholder="Contraseña" id="login-password" >
      <button type="submit" class="btnIngresar" id="btnIngresar"> Ingresar </button>
    </form>
    <p class ="p-login"> -------------O ingresa con: -----------------------</p>
    <div class="logo-container">
      <img class="image-facebook" src="https://i.pinimg.com/736x/8e/fb/55/8efb55e9efc12eb11bedf41caa7f33bb.jpg">
      <img class="image-google" src="https://w7.pngwing.com/pngs/543/934/png-transparent-google-app-logo-google-logo-g-suite-google-text-logo-circle.png">
    </div>
      <p> ¿No tienes cuenta? <a href="#/registro"> Regístrate </a> </p>
  </div>`;
  const divLogin = document.createElement('div');
  divLogin.id = 'login';
  divLogin.innerHTML = loginView;
  return divLogin;
};
