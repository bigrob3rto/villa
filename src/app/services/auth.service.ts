import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string | null = ''
  private logged = new ReplaySubject<boolean>(1);
  isLogged = this.logged.asObservable();

  constructor(private dbService: DbService) { }

  async login(email: string, password: string) {
    const data = await this.dbService.login(email, password)
    this.token = 'logged'
    this.logged.next(true)
    return data
  }

  logout() {
    localStorage.removeItem('access_token')
    this.logged.next(false)
  }

  set token(token: string) {
    this.accessToken = token;
    localStorage.setItem('access_token', token);
  }

  get token(): string | null {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('access_token');
    }
    return this.accessToken;
  }

  checkStatus() {
    if (this.token) {
      this.logged.next(true);
    } else {
      this.logged.next(false);
    }
  }

}
