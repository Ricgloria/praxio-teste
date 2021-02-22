import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../shared/models/user';

const USER = 'user';
const LOGGED = 'logged';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private route: Router
  ) {
  }

  login(user: { email: string, password: string }): boolean {

    if (this.checkRegisteredUser()
      && this.getRegisteredUserStorage()?.email === user.email
      && this.getRegisteredUserStorage()?.password === user.password) {
      this.setUserStorage(LOGGED, 'yes');
      return true;
    } else {
      return false;
    }
  }


  registerUserLocalStorage(user: User): void {
    this.setUserStorage(USER, user);
  }

  setUserStorage(localName: string, data: {}): void {
    const stringData = JSON.stringify(data);
    return localStorage.setItem(localName, stringData);
  }

  checkLoggedUser(): boolean {
    return !!this.getLoggedUserStorage();
  }

  getLoggedUserStorage(): string {
    return JSON.parse(localStorage.getItem(LOGGED) as string);
  }

  checkRegisteredUser(): boolean {
    return !!this.getRegisteredUserStorage();
  }

  getRegisteredUserStorage(): User {
    return JSON.parse(localStorage.getItem(USER) as string);
  }

  clearUserStorage(): void {
    localStorage.removeItem(USER);
  }

  logoutUser(): void {
    localStorage.removeItem(LOGGED);
    this.route.navigate(['/']);
  }
}
