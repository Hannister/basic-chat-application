import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  signUp(userName: string, email: string, password: string) {
    console.log(userName, email, password);
  }

  login(email: string, password: string) {
    console.log(email, password);
  }
}
