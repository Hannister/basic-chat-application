import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {
  redirectLoggedInTo,
  canActivate,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(() => redirectLoggedInTo(['chat'])),
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(() => redirectLoggedInTo(['chat'])),
  },
  {
    path: 'chat',
    ...canActivate(() => redirectUnauthorizedTo(['login'])),
    loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
  },
];
