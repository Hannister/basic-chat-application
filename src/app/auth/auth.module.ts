import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormContainerComponent } from './form-container/form-container.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, FormContainerComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule],
  exports: [LoginComponent, SignupComponent, FormContainerComponent],
})
export class AuthModule {}
