export const register = () => {
    const sectRegister = document.createElement("section");
    sectRegister.className = 'sectRegister';
    containerRoot.appendChild(register);
    containerRoot.innerHTML = "";
    sectRegister.innerHTML = 
    `
    <div class = 'container-register'>
    <img id="logo" alt="img popcorn" class= "logo-popcorn" src= "imagenes/pop1.png"   >
    <form id = "form-register" class="form-register"> 
    <div>
     <h1>Regístrate</h1>
     <input type="text" placeholder="Nombre de Usuario" id="user" required>
     <input type="email" placeholder="Correo electrónico" id="Email" required>
     <input type="password" placeholder="Contraseña" id="password" required>

     <button type="button" class="btnRegistrate"  id="button-SignUp">Regístrate</button>
     <button type="submit" class= "btnGoogle id="iniciaGoogle">Ingresa con Google</button>
 </div>
  </form>
  </div>
  `;
  return register;
}