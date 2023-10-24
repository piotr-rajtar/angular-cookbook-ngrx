import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

import { API_KEY } from '../models/api-key';
import { User } from '../models/user';
import {
  AUTH_ERROR_KEYS,
  AuthFormData,
  SIGN_IN_ERROR_KEY,
  SIGN_UP_ERROR_KEY,
  SignInResponseData,
  SignUpResponseData,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();

  constructor(private httpClient: HttpClient) { }

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
}
