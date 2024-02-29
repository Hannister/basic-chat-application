export interface LoginAuthForm {
  email: string;
  password: string;
}

export interface SignInAuthForm extends LoginAuthForm {
  displayName: string;
}
