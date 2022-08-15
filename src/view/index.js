import Inicio from './inicio.js';
import Home from './home.js';
import Register from './register.js';
import Login from './login.js';
import { profileTemplate } from './profile.js';
import { errorTemplate } from './404error.js';

const components = {
  inicio: Inicio,
  home: Home, // Vista del muro donde se ven las publicaciones
  register: Register, // Vista de la página de registro
  login: Login, //  Vista de la página de ingreso
  profile: profileTemplate, // Vista del perfil del usuario
  error: errorTemplate,
};

export { components };
