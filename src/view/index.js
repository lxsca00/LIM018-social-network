import Inicio from './inicio.js';
import { homeTemplate } from './home.js';
import { registerTemplate } from './register.js';
import { loginTemplate } from './login.js';
import { profileTemplate } from './profile.js';
import { errorTemplate } from './404error.js';

const components = {
  inicio: Inicio,
  home: homeTemplate, // Vista del muro donde se ven las publicaciones
  register: registerTemplate, // Vista de la página de registro
  login: loginTemplate, //  Vista de la página de ingreso
  profile: profileTemplate, // Vista del perfil del usuario
  error: errorTemplate,
};

export { components };
