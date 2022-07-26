//  Vista de la página de ingreso

export default () => {
  /* document.getElementById("containerNav").style.visibility = "hidden"; */
  const InicioView = `
  <section id = 'container-inicio'>
  <div class="logo-popcornZone">
    <div class="fondo-logo">
      <img class="imagen-logo" src="https://i.pinimg.com/originals/54/cc/e0/54cce0449cfd4414fdc19b068a97e00a.png">
    </div>
  </div>
  <div class="informacion-PopcornZone">
    <h1 id="marca">PopcornZone</h1>
    <br>
    <p id="inicio-message"> ¡Bienvenido a la red social más popular de los amantes de películas y series! 
      Comparte opiniones, encuentra recomendaciones y queda con tus amigos para maratonear juntos <img src="https://emoji.slack-edge.com/T0NNB6T0R/tripleparrot/c0e30174660324aa.gif">. </p>
    <br>  
    <br>
    <p class ="p-inicio"> Únete a PopcornZone hoy  </p> 
    <button type="submit" class="btnInicio" id="registrarmeInicio-button"> REGISTRARME </button>
    <br>
    <br>
    <p class ="p-inicio"> ¿Ya tienes una cuenta? </p>
    <button type="submit" class="btnInicio" id="loginInicio-button"> INICIAR SESIÓN </button>
  </div>
</section>`;
  const divInicio = document.createElement('div');
  divInicio.id = 'login';
  divInicio.innerHTML = InicioView;
  return divInicio;
};
