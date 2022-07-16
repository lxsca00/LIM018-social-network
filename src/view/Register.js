// Vista de la página de registro

export default () => {
  const viewRegister = `
  <form>  
    <input type="text" placeholder="Nombre">
    <input type="text" placeholder="Nombre de usuario">
    <input type="text" placeholder="Email">
    <input type="password" placeholder="Password">
    <input type="text" placeholder="País">
    <input type="date" placeholder="Fecha de nacimiento">
    <button type="submit"> Registrarme </button>
  </form>
  <p> O ingresa con: </p>
  <button> Google </button>
  <button> Facebook </button>`;
  const divRegister = document.createElement('div');
  divRegister.id = 'register';
  divRegister.innerHTML = viewRegister;
  return divRegister;
};
