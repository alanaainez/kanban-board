import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp?: number;
  [key: string]: any; // Allow other properties
}

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<DecodedToken>(token) : null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (!decoded.exp) return false; // If no `exp`, assume it's valid
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false; // If decoding fails, assume token is invalid
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('id_token') || '';;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO: redirect to the login page
    window.location.assign('/');    
  }
}

export default new AuthService();
