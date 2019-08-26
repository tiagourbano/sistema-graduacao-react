const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.isLoggedIn) {
    return true;
  }

  return false;
}

export default isAuthenticated;
