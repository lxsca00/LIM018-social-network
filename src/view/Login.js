//  Vista de la página de ingreso

export default () => {
  const loginView = `
    <div class = 'container-login'>
    <img id="logo" alt="img popcorn" class= "logo-popcorn" src= "imagenes/pop1.png"   >
    <form id = "form-login" class="form-login"> 
    <div>
     <h1>Inicia Sesión</h1>
    <input type="email" placeholder="Correo Electrónico" id="ingresaEmail" >
    <input type="password"  placeholder="Contraseña" id="ingresaContrasena" >
    <button type="submit" class="btnRegistrar" id="btnRegistrar">¿No tienes cuenta? Regístrate</button>
    <button type="submit" class= "btnGoogle id="iniciaGoogle">Ingresa con Google</button>
  </div>
  </form>
  </div>`;
  const divLogin = document.createElement('div');
  divLogin.id = 'login';
  divLogin.innerHTML = loginView;
  return divLogin;
};
