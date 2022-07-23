/* eslint-disable max-len */
// importamos la funcion que vamos a testear
import {
  eventLogin,
  eventRegister,
} from '../src/lib/index.js';
// eventLogin,
// eventLogout,

// REGISTER - USUARIOS  // ASYNC/AWAIT
describe('eventRegister', () => {
  it('debería ser una función', () => {
    expect(typeof eventRegister).toBe('function');
  });// https://jestjs.io/es-ES/docs/asynchronous

  //   // ASYNC/AWAIT
  //   // Jest did not exit one second after the test run has completed.
  //   // This usually means that there are asynchronous operations that weren't stopped in your tests.
  //   // Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.

  //   test('register user', async () => { // Attempted to log "Firebase: Error (auth/email-already-in-use).".
  //     await expect(eventRegister('sssabcdef@gmail.com', '123456')).resolves.toBe('sssabcdef@gmail.com created successfully');
  //   });

  //   test('register error', async () => { // Cannot log after tests are done. Did you forget to wait for something async in your test? //  Attempted to log "auth/email-already-in-use".
  //     await expect(eventRegister('sss@gmail.com', '123456')).rejects.toMatch('error');
  //   });
});

// LOGIN - USUARIOS   //RESOLVES/REJECTS
describe('eventLogin', () => {
  it('debería ser una función', () => {
    expect(typeof eventLogin).toBe('function');
  });
  // https://jestjs.io/es-ES/docs/asynchronous
  // RESOLVES
  test('login (ingreso) para usuario registrado', () => expect(eventLogin('sss@gmail.com', '123456')).resolves.toBe('sss@gmail.com si tiene una cuenta activa'));
  test('login (ingreso) para usuario sin registrar', () => expect(eventLogin('Ab1wqwed23@gmail.com', 'aqwe456')).resolves.toBe('Firebase: Error (auth/user-not-found).'));
  // https://jestjs.io/es-ES/docs/asynchronous

  // // ASYNC/AWAIT
  test('register user', async () => {
    const register = await eventLogin('sss@gmail.com', '123456');
    expect(register).toBe('sss@gmail.com si tiene una cuenta activa');
  });
});
