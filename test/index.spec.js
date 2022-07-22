// importamos la funcion que vamos a testear
import { myFunction } from '../src/lib/index';

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
});

// RAMA VANESSA
import {
  ingreso,
  
} from '../src/lib/index.js';

describe('login (ingreso)', () => {
  it('debería ser una función', () => {
    expect(typeof ingreso).toBe('function');
  });
  // https://jestjs.io/es-ES/docs/asynchronous
  // RESOLVES
  test('login (ingreso) para usuario registrado', () => expect(ingreso('sss@gmail.com', '123456')).resolves.toBe('El sss@gmail.com si tiene una cuenta activa'));
  test('login (ingreso) para usuario sin registrar', () => expect(ingreso('Ab1wqwed23@gmail.com', 'aqwe456')).resolves.toBe('Firebase: Error (auth/user-not-found).'));
  // https://jestjs.io/es-ES/docs/asynchronous
  // ASYNC/AWAIT
  //   test('login (ingreso) para usuario registrado', async () => {
//     const login = await ingreso('sss@gmail.com', '123456');
//     expect(login).toBe('El sss@gmail.com si tiene una cuenta activa');
//   });
});

describe('register', () => {
  it('debería ser una función', () => {
    expect(typeof ingreso).toBe('function');
  });
  // https://jestjs.io/es-ES/docs/asynchronous
  // ASYNC/AWAIT
  //   test('login (ingreso) para usuario registrado', async () => {
//     const login = await ingreso('sss@gmail.com', '123456');
//     expect(login).toBe('El sss@gmail.com si tiene una cuenta activa');
//   });
});
