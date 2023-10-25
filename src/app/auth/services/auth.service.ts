import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

import { API_KEY } from '../models/api-key';
import { User } from '../models/user';
import {
  AUTH_ERROR_KEYS,
  AuthFormData,
  SIGN_IN_ERROR_KEY,
  SIGN_UP_ERROR_KEY,
  SignInResponseData,
  SignUpResponseData,
  StoredUserData,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer!: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  signIn(authFormData: AuthFormData): Observable<SignInResponseData> {
    return this.httpClient.post<SignInResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        ...authFormData,
        returnSecureToken: true,
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(signupResponseData => {
        this.handleAuthentication(
          signupResponseData.email,
          signupResponseData.localId,
          signupResponseData.idToken,
          Number(signupResponseData.expiresIn),
        );
      })
    )
  }

  signUp(authFormData: AuthFormData): Observable<SignUpResponseData> {
    return this.httpClient.post<SignUpResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        ...authFormData,
        returnSecureToken: true,
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(signupResponseData => {
        this.handleAuthentication(
          signupResponseData.email,
          signupResponseData.localId,
          signupResponseData.idToken,
          Number(signupResponseData.expiresIn),
        );
      })
    );
  }

  handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    //CONVERTING EXPIRES IN TIME TO MS
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );

    this.user.next(user);

    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  handleError(errorResponce: HttpErrorResponse) {
    const errorKey: AUTH_ERROR_KEYS |undefined = errorResponce.error?.error?.message;

    if(!errorKey) {
      const errorMessage = 'An unknown error occured';
      return throwError(() => new Error(errorMessage));
    }

    const errorMessages: Record<AUTH_ERROR_KEYS, string> = {
      [SIGN_IN_ERROR_KEY.INVALID_LOGIN_CREDENTIALS]: 'Login credentials are incorrect',
      [SIGN_IN_ERROR_KEY.USER_DISABLED]: 'User account has been disabled',
      [SIGN_UP_ERROR_KEY.EMAIL_EXISTS]: 'This email exists already',
      [SIGN_UP_ERROR_KEY.OPERATION_NOT_ALLOWED]: 'Tha password has been disabled',
      [SIGN_UP_ERROR_KEY.TOO_MANY_ATTEMPTS_TRY_LATER]: 'Too many sign up attampts. Please try again later',
    }

    const errorMessage = errorMessages[errorKey] || 'An unknown error occured';

    return throwError(() => new Error(errorMessage));
  }

  autoLogin():void {
    const userData = localStorage.getItem('userData');

    if(!userData) {
      return;
    }

    const parsedUserData: StoredUserData = JSON.parse(userData);

    const loadedUser = new User(
      parsedUserData.email,
      parsedUserData.id,
      parsedUserData._token,
      new Date(parsedUserData._tokenExpirationDate)
    )

    if(loadedUser.token) {
      this.user.next(loadedUser);
      const tokenExpirationTimeInMs: number =
        new Date(parsedUserData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(tokenExpirationTimeInMs);
    }
  }

  autoLogout(tokenExpirationTimeInMs: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, tokenExpirationTimeInMs);
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}
