// Vista de la página de registro

export default () => {
  const viewRegister = `
  <form id="registerForm">  
    <input id="userName" type="text" placeholder="Nombre">
    <input id="userUsername" type="text" placeholder="Nombre de usuario">
    <input id="userEmail" type="text" placeholder="Email">
    <input id="userPassword" type="password" placeholder="Password">
    <input id="userCountry" type="text" placeholder="País">
    <input id="userBirth" type="date" placeholder="Fecha de nacimiento">
    <button id="btnRegister" type="submit"> Registrarme </button>
  </form>
  <p> ¿Ya tienes cuenta? </p>
  <p> <a href="#/login"> Inicia sesión </a> </p>`;
  const divRegister = document.createElement('div');
  divRegister.id = 'register';
  divRegister.innerHTML = viewRegister;
  return divRegister;
};
