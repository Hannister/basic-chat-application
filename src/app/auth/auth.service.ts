import { Injectable } from '@angular/core';
import { LoginAuthForm, SignInAuthForm } from './authForm';
import { BehaviorSubject, from, switchMap } from 'rxjs';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<object | null>(null);
  readonly isLoggedIn$ = authState(this.auth);

  constructor(private auth: Auth, private http: HttpClient) {}

  getUser() {
    return this.auth.currentUser;
  }

  signup({ email, password, displayName }: SignInAuthForm) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(switchMap(({ user }) => updateProfile(user, { displayName })));
  }

  login({ email, password }: LoginAuthForm) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signOut() {
    return from(this.auth.signOut());
  }
}
