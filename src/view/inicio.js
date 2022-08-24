//  Vista de la página de ingreso

export default () => {
  const inicioView = `
  <div class="welcome-logo">
    <div class="background-logo">
      <img class="img-logo" src="https://i.pinimg.com/originals/54/cc/e0/54cce0449cfd4414fdc19b068a97e00a.png">
    </div>
  </div>
  <div class="info-app">
    <h1 id="brand">PopcornZone</h1>
    <p id="welcome-message"> ¡Bienvenido a la red social más popular de los amantes de películas y series! 
      Comparte opiniones, encuentra recomendaciones y queda con tus amigos para maratonear juntos <img src="https://emoji.slack-edge.com/T0NNB6T0R/tripleparrot/c0e30174660324aa.gif">. </p>
    <p> Únete a PopcornZone hoy  </p> 
    <button type="submit" id="welcome-register-button"> <a href="#/registro"> REGISTRARME </a> </button>
    <p> ¿Ya tienes una cuenta? </p>
    <button type="submit" id="welcome-login-button"> <a href="#/login"> INICIAR SESIÓN </a> </button>
  </div>`;
  const divInicio = document.createElement('section');
  divInicio.classList = 'welcome';
  divInicio.innerHTML = inicioView;
  return divInicio;
};
