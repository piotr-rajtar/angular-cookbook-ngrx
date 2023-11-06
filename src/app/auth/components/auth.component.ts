import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AlertType } from '../../shared/models';
import { AppState } from '../../store/types';

import { AuthFormData } from '../models';
import { authActions } from '../store/auth.actions';
import { AuthState } from '../store/auth.reducer';
import { selectAuthState } from '../store/auth.selectors';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy, OnInit {
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;
  storeSubscription!: Subscription;

  AlertType = AlertType;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select(selectAuthState)
      .subscribe((authState: AuthState) => {
        this.isLoading = authState.isLoading;
        this.error = authState.authError;
      });
  }

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

    if(this.isAuthenticated) {
      this.store.dispatch(authActions.signIn({ authFormData }));
    } else {
      this.store.dispatch(authActions.signUp({ authFormData }));
    }

    authForm.reset();
  }

  closeErrorAlert(): void {
    this.store.dispatch(authActions.clearError());
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe;
  }
}
