export const errorTemplate = () => {
  const error404 = `
    <img src="images/404error.png" alt="Página no encontrada">
    <h1> Error 404 </h1>
    <h2> Página no encontrada </h2>`;
  const divError = document.createElement('div');
  divError.classList = 'error404';
  divError.innerHTML = error404;
  return divError;
};
