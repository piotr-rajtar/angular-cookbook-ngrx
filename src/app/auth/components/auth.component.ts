import { Component, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PlaceholderDirective } from '../../shared/directives/placeholder.directive';
import { AlertType } from '../../shared/models';
import { AlertComponent } from '../../shared/components/alert/alert.component';

import {
  AuthFormData,
  SignInResponseData,
  SignUpResponseData,
} from '../models';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {
  closeAlertSubscription!: Subscription;
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;

  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

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
        this.showErrorAlert(errorResponce.message);
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
        this.showErrorAlert(errorResponce.message);
      }
    });
  }

  //FRAGMENT KODU DO NG-IFA
  // closeErrorAlert(): void {
  //   this.error = null;
  // }

  //ZOSTAWIONE DO CELÓW DEMONSTRACYJNYCH
  //PREFEROWANE JEST ZAWSZE UŻYWANIE NGIFA, KTÓRY ROBI TO WSZYSTKO ZA NAS

  private showErrorAlert(errorMessage: string): void {
    //WYBIERAMY KONTENER, KTÓRY POSIADA DYREKTYWE PlaceholderDirective GDZIE BĘDZIE WYŚWIETLANY NASZ ALERT
    const viewContainerRef = this.alertHost.viewContainerRef;

    //CZYŚCIMY TEN KONTENER Z JAKICHŚ INNYCH KOMPONENTÓW, KTÓRE MOGŁY BYĆ TAM POPRZEDNIO WRZUCONE
    viewContainerRef.clear();

    //TWORZYMY NOWĄ INSTANCJĘ KOMPONENTU ALERTU
    const componentRef = viewContainerRef.createComponent<AlertComponent>(AlertComponent);

    //DODAJEMY PROPY
    componentRef.instance.message = errorMessage;
    componentRef.instance.type = AlertType.DANGER;

    //SUBSKRYBUJEMY TYLKO NA SUBJECT LUB BEHAVIOUR SUBJECT LUB OBSERVABLE
    //TO JEDYNY PRZYPADEK KIEDY MOŻNA SUBSKRYBOWAĆ SIĘ NA EVENT
    this.closeAlertSubscription = componentRef.instance.close.subscribe(() => {
      this.closeAlertSubscription.unsubscribe();
      viewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if(this.closeAlertSubscription) {
      this.closeAlertSubscription.unsubscribe();
    }
  }
}
