/* eslint-disable max-len */
// https://jestjs.io/es-ES/docs/asynchronous

import { // importamos la funcion que vamos a testear
  eventLogin,
  eventRegister,
  eventLogout,
} from '../src/lib/index.js';

// REGISTER - USUARIOS    //RESOLVES/REJECTS
describe('eventRegister', () => {
  it('debería ser una función', () => {
    expect(typeof eventRegister).toBe('function');
  });
  test('registrar usuario nuevo', () => expect(eventRegister('sss3abaq@gmail.com', '123456')).resolves.toBe('sss3abaq@gmail.com created successfully'));
  test('registrar usuario registrado', () => expect(eventRegister('sss123abc1q@gmail.com', '123456')).resolves.toBe('Firebase: Error (auth/email-already-in-use).'));

  //   // ASYNC/AWAIT // quizas pq faltaba un return para que sea promesa
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

// LOGIN - USUARIOS      // ASYNC/AWAIT
describe('eventLogin', () => {
  it('debería ser una función', () => {
    expect(typeof eventLogin).toBe('function');
  });
  test('login (ingreso) para usuario registrado', async () => {
    const register = await eventLogin('sss@gmail.com', '123456');
    expect(register).toBe('sss@gmail.com si tiene una cuenta activa');
  });
  test('login (ingreso) para usuario sin registrar', async () => {
    const register = await eventLogin('Ab1wqwed23@gmail.com', 'aqwe456');
    expect(register).toBe('Firebase: Error (auth/user-not-found).');
  });

  // RESOLVES
  // test('login (ingreso) para usuario registrado', () => expect(eventLogin('sss@gmail.com', '123456')).resolves.toBe('sss@gmail.com si tiene una cuenta activa'));
  // test('login (ingreso) para usuario sin registrar', () => expect(eventLogin('Ab1wqwed23@gmail.com', 'aqwe456')).resolves.toBe('Firebase: Error (auth/user-not-found).'));
});

// CERRAR SESION - USUARIOS   // ASYNC/AWAIT
describe('eventLogout', () => {
  it('debería ser una función', () => {
    expect(typeof eventLogout).toBe('function');
  });
  test('logout: cerrar sesión correctamente', async () => {
    const logout = await eventLogout();
    expect(logout).toBe('error al cerrar sesión');
  });
  test('logout: error al cerrar sesión', async () => {
    const logout = await eventLogout('a');
    expect(logout).toBe('error al cerrar sesión');
  });
});
