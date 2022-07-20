//  Vista de la página de ingreso

export default () => {
  const loginView = `
    <div class = 'container-login'>

      <div class= "container-img-login">
         <img class="image-login" src="https://i.pinimg.com/originals/54/cc/e0/54cce0449cfd4414fdc19b068a97e00a.png">
      </div>

      <div class="container-h2-form">

        <div class="h2-login">
          <h2 class="text-center"> ¡Bienvenidos a PopcornZone! </h2>
        </div>

        <div class= "container-form-login">
          <form id = "form-login" class="form-login"> 
            <h1 class="h1-login">Inicia Sesión</h1>
            <input type="email" placeholder="Correo Electrónico" id="ingresaEmail" class="input-login-email" >
            <input type="password"  placeholder="Contraseña" id="ingresaContrasena"class="input-login-password" >
            <button type="submit" class="btnRegistrar" id="btnRegistrar">¿No tienes cuenta? Regístrate</button>
            <button type="submit" class= "btnGoogle id="iniciaGoogle">Ingresa con Google</button>
          </form>
        </div>
     </div>
   </div>`;

  const divLogin = document.createElement('div');
  divLogin.id = 'login';
  divLogin.innerHTML = loginView;
  return divLogin;
};
