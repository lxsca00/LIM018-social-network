// Vista de la página de registro

export default () => {
  const viewRegister = `
  <div class = 'container-register'>
    <img class="image-register" src="https://i.pinimg.com/originals/54/cc/e0/54cce0449cfd4414fdc19b068a97e00a.png">
    <form id="register-form">  
      <input id="user-name" type="text" placeholder="Nombre">
      <input id="user-username" type="text" placeholder="Nombre de usuario">
      <input id="user-email" type="text" placeholder="Email">
      <input id="user-password" type="password" placeholder="Password">
      <input id="user-country" type="text" placeholder="País">
      <input id="user-birth" type="date" placeholder="Fecha de nacimiento">
      <button id="btnRegister" type="submit"> Registrarme </button>
    </form>
    <p> ¿Ya tienes cuenta? <a href="#/login"> Inicia sesión </a> </p>
  </div>`;
  const divRegister = document.createElement('div');
  divRegister.id = 'register';
  divRegister.innerHTML = viewRegister;
  return divRegister;
};
