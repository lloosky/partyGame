export function beforeEnter(to, from, next) {
  let storagePin = localStorage.getItem('newGamePin');

  if (storagePin) {
    next();
    console.log('Witamy w grze');
  } else {
    next('/');
    console.log('Brak dostępu do gry');
  }
}
