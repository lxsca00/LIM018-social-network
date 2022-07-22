import { ingreso } from '../src/lib/index.js';

// importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });

describe('login (ingreso)', () => {
  it('debería ser una función', () => {
    expect(typeof ingreso).toBe('function');
  });

  // eslint-disable-next-line max-len
  test('login (ingreso) para usuario registrado', () => expect(ingreso('sss@gmail.com', '123456')).resolves.toBe('El sss@gmail.com si tiene una cuenta activa'));

//   test('login (ingreso) para usuario registrado', async () => {
//     const login = await ingreso('sss@gmail.com', '123456');
//     expect(login).toBe('El sss@gmail.com si tiene una cuenta activa');
//   });
});
