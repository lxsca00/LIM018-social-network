export const eventLogin = () => {
  Promise.resolve({
    user: {
      email: 'sss@gmail.com',
      password: '123456',
    },
  });
//     .then(({
//         userCredential: {
//             user: xxxxxx,
//         }
//     }) => {
//         const user = userCredential.user;
//     })
//     const user = userCredential.user;
//     return (`${user.email} si tiene una cuenta activa`);
//   }
//   .catch (error) {
//     return Promise.reject(
//       new Error('Firebase: Error (auth/user-not-found).'),
//     );
};

// export function eventLogin(eMail, password) {
//   Promise.resolve({
//     user: {
//       eMail: 'sss@gmail.com',
//       password: '123456',
//     },
//   });
//   Promise.reject(
//     new Error('Firebase: Error (auth/user-not-found).'),
//   );
// }
