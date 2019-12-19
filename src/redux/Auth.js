class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {object} token
   */
  static setAuth(token) {
    localStorage.setItem('ad_network_auth', JSON.stringify(token));
  }

  static removeAuth() {
    localStorage.removeItem('ad_network_auth');
  }

  static getAuth() {
    return localStorage.getItem('ad_network_auth');
  }

  static authenticateUser(user) {
    console.log("user",user);
    localStorage.setItem('ad_network_user', JSON.stringify(user));
  }

  /**
   * Check if a user is authenticated - check if a user is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('ad_network_auth') !== null;
  }

  static removeAuthenticateUser() {
    localStorage.removeItem('ad_network_user');
  }

  static getUser() {
    const user = localStorage.getItem('ad_network_user');
    console.log("user",user);
    return user ? JSON.parse(user) : null;
  }
}

export default Auth;
