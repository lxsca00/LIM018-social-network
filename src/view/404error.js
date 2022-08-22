export const errorTemplate = () => {
  const error404 = `
    <img src="images/404error.png" alt="Página no encontrada">
    <div class="error-text">
      <h1> Error 404 </h1>
      <h2> ¡Lo sentimos! No podemos encontrar la página que estás buscando </h2>
      <button class="back"><a href='#/'> LLÉVAME DE REGRESO </a></button>
    </div>`;
  const divError = document.createElement('section');
  divError.classList = 'error404';
  divError.innerHTML = error404;
  return divError;
};
