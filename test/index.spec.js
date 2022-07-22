import { ingreso } from '../src/lib/index.js';

describe('login (ingreso)', () => {
  it('debería ser una función', () => {
    expect(typeof ingreso).toBe('function');
  });
  // https://jestjs.io/es-ES/docs/asynchronous
  // resolves/rejects
  test('login (ingreso) para usuario registrado', () => expect(ingreso('sss@gmail.com', '123456')).resolves.toBe('El sss@gmail.com si tiene una cuenta activa'));
  test('login (ingreso) para usuario sin registrar', () => expect(ingreso('ABC@gmail.com', '123456')).resolves.toBe('El sss@gmail.com si tiene una cuenta activa'));
//   test('login (ingreso) para usuario registrado', async () => {
//     const login = await ingreso('sss@gmail.com', '123456');
//     expect(login).toBe('El sss@gmail.com si tiene una cuenta activa');
//   });
});
