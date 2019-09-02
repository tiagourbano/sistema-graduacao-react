export function isAuthenticated() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.isLoggedIn) {
    return true;
  }

  return false;
};

export function isAdmin() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.isLoggedIn && user.user.isMaster) {
    return true;
  }

  return false;
};
