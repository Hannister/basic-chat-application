import { Injectable } from '@angular/core';
import { LoginAuthForm, SignInAuthForm } from './authForm';
import { BehaviorSubject, forkJoin, from, map, pluck, switchMap } from 'rxjs';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ChatClientService } from 'stream-chat-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<object | null>(null);
  readonly isLoggedIn$ = authState(this.auth);

  constructor(private auth: Auth, private http: HttpClient) {}

  getCurrentUser() {
    return this.auth.currentUser!;
  }

  getStreamToken() {
    return this.http
      .post<{ token: string }>(`${environment.apiUrlCreateToken}`, {
        user: this.getCurrentUser(),
      })
      .pipe(map((x) => x?.token));
  }

  signup({ email, password, displayName }: SignInAuthForm) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) =>
        forkJoin([
          updateProfile(user, { displayName }),
          this.http.post(`${environment.apiUrlCreateUser}`, {
            user: { ...user, displayName },
          }),
        ])
      )
    );
  }

  login({ email, password }: LoginAuthForm) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signOut() {
    return from(this.auth.signOut());
  }
}
