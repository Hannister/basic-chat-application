import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MyErrorStateMatcher } from '../../shared/form-error-state-matcher';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
    });
  }

  login() {
    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['chat']);
      },
      error: (error) => {
        this.snackbar.open(error.message, '', {
          duration: 3000,
        });
      },
    });
  }
}
