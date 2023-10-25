import { Component } from '@angular/core';
import { NgForm, NgModel, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import {
  AuthFormData,
  SignInResponseData,
  SignUpResponseData,
} from './models';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  get authButtonTitle(): string {
    return this.isAuthenticated
      ? 'Login'
      : 'Sign up'
  }

  get switchButtonTitle(): string {
    return this.isAuthenticated
      ? 'Switch to Sign Up'
      : 'Switch to Login'
  }

  getEmailError(emailField: NgModel): string {
    const errors = {
      required: 'Field is required',
      email: 'Entered email address is invalid'
    }
    const errorKey = Object.keys(emailField.errors as ValidationErrors)[0];
    return errors[errorKey as keyof typeof errors];
  }

  getPasswordError(passwordField: NgModel): string {
    const errors = {
      required: 'Field is required',
      minlength: 'Password has to include min. 6 characters',
    }
    const errorKey = Object.keys(passwordField.errors as ValidationErrors)[0];
    return errors[errorKey as keyof typeof errors];
  }

  switchAuthenticationMode(): void {
    this.isAuthenticated = !this.isAuthenticated;
  }

  onSubmit(authForm: NgForm): void {
    if(!authForm.valid) {
      return;
    }

    const authFormData: AuthFormData = authForm.value;

    this.isLoading = true;

    if(this.isAuthenticated) {
      this.signIn(authFormData);
    } else {
      this.signUp(authFormData);
    }

    authForm.reset();
  }

  signIn(authFormData: AuthFormData) {
    this.authService.signIn(authFormData).subscribe({
      next: (_authResponseData: SignInResponseData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorResponce: Error) => {
        this.error = errorResponce.message;
        this.isLoading = false;
      }
    });
  }

  signUp(authFormData: AuthFormData) {
    this.authService.signUp(authFormData).subscribe({
      next: (_authResponseData: SignUpResponseData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorResponce: Error) => {
        this.error = errorResponce.message;
        this.isLoading = false;
      }
    });
  }
}
