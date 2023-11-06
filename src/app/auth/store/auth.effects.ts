import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, EMPTY, map, of, switchMap, tap } from 'rxjs';

import { environment } from '../../../environments/environment';

import { getErrorMessage } from '../helpers';
import { SignInResponseData, SignUpResponseData, StoredUserData } from '../models';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

import { authActions } from './auth.actions';

//ERROR HANDLING W PRZYPADKU EFFEKTÓW DZIAŁA INAZEJ NIŻ NA NORMALNYM OBSERVABLU
//JAK JEST ERROR TO OBSERVABL SIĘ KOŃCZY
//W PRZYPADKU EFEKTÓW, KTÓRE SĄ LISTENERAMI NA STRUMIEŃ OBSERVABLI, NIE MOGĄ SIĘ ONE SKOŃCZYĆ
//JAK SIĘ ZAKOŃCZĄ, TO JUŻ SIĘ NIE ODPALĄ PONOWNIE
//DLATEGO, MUSZĄ BYĆ CIĄGLE PODTRZYMYWANE
//W PRZYPADKU ZAPYTAŃ HTTP, JAK WYSKOCZY BŁĄD PRZY FETCHU CZY JAK SIĘ UDA POBRAĆ DANE, TO OBSERVABL SIĘ KOŃCZY
//W CELU PODTRZYMANIA EFEKTU, ŻEBY SIĘ NIE SKOŃCZYŁ, TRZEBA ZASTOSOWAĆ HANDLING DLA BŁĘDU I UKOŃCZENIA WEWNĄTRZ FLATTENING OPERATORA
//I W RAMACH HANDLINGU DLA ERRORA CZY SUKCESU, TE OPERATORY MUSZĄ ZWRÓCIĆ TEŻ OBSERVABLA, ŻEBY CAŁY STRUMIEŃ NIE PADŁ

const handleAuthenticationSuccess = (responseData: SignInResponseData | SignUpResponseData) => {
  //CONVERTING EXPIRES IN TIME TO MS
  const expirationDate =
    new Date(new Date().getTime() + (Number(responseData.expiresIn) * 1000));

  const user = new User(
    responseData.email,
    responseData.localId,
    responseData.idToken,
    expirationDate
  );

  localStorage.setItem('userData', JSON.stringify(user));

  return authActions.authenticationSuccess({
    loginData: {
      email: responseData.email,
      userId: responseData.localId,
      token: responseData.idToken,
      expirationDate,
    }
  });
}

export const signIn = createEffect(
  (
    actions$ = inject<Actions<Action>>(Actions),
    httpClient = inject(HttpClient),
    authService = inject(AuthService),
  ) => {
    return actions$.pipe(
      ofType(authActions.signIn),
      switchMap(signInAction => {
        return httpClient
          .post<SignInResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`,
            {
              ...signInAction.authFormData,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap(signInResponseData =>
              //CONVERTING EXPIRES IN TIME TO MS
              authService.setLogoutTimer(Number(signInResponseData.expiresIn) * 1000)
            ),
            //W MAP I CATCH ERROR MUSIMY ZWRÓCIĆ NON ERROR OBSERVABLE ŻEBY STRUMIEŃ NIE PADŁ
            //W ŚRODKU ZWRACAMY AKCJĘ, ALE NIE MUSIMY JEJ DISPATCHOWAC, BO EFFECT ZROBI TO ZA NAS
            map(signInResponseData => handleAuthenticationSuccess(signInResponseData)),
            //MAP TO CO ZWRACA UBIERA SAMO W OBSERVABLA, TUTAJ MUSIMY STWORZYĆ GO SAMI
            catchError((errorResponce: HttpErrorResponse) =>
              of(authActions.authenticationError({
                errorMessage: getErrorMessage(errorResponce),
              }))
            ),
          );
      }),
    );
  },
  { functional: true }
);

export const signUp = createEffect(
  (
    actions$ = inject<Actions<Action>>(Actions),
    httpClient = inject(HttpClient),
    authService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(authActions.signUp),
      switchMap(signUpAction => {
        return httpClient
          .post<SignUpResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`,
            {
              ...signUpAction.authFormData,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap(signUpResponseData =>
              authService.setLogoutTimer(Number(signUpResponseData.expiresIn) * 1000)
            ),
            map(signUpResponseData => handleAuthenticationSuccess(signUpResponseData)),
            catchError((errorResponce: HttpErrorResponse) =>
              of(authActions.authenticationError({
                errorMessage: getErrorMessage(errorResponce),
              }))
            ),
          );
      }),
    )
  },
  { functional: true }
);

export const autoLogin = createEffect(
  (
    actions$ = inject<Actions<Action>>(Actions),
    authService = inject(AuthService),
  ) => {
    return actions$.pipe(
      ofType(authActions.autoLogin),
      switchMap(() => {
        const userData = localStorage.getItem('userData');

        if(!userData) {
          return EMPTY;
        }

        const parsedUserData: StoredUserData = JSON.parse(userData);

        const loadedUser = new User(
          parsedUserData.email,
          parsedUserData.id,
          parsedUserData._token,
          new Date(parsedUserData._tokenExpirationDate)
        );

        if(loadedUser.token) {
          const tokenExpirationTimeInMs: number =
            new Date(parsedUserData._tokenExpirationDate).getTime() - new Date().getTime();

          authService.setLogoutTimer(tokenExpirationTimeInMs);

          return of(authActions.authenticationSuccess({
            loginData: {
              email: parsedUserData.email,
              userId: parsedUserData.id,
              token: parsedUserData._token,
              expirationDate: new Date(parsedUserData._tokenExpirationDate),
            },
          }));
        }
        return EMPTY;
      }),
    );
  },
  { functional: true }
)

export const authenticationRedirect = createEffect(
  (actions$ = inject<Actions<Action>>(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.authenticationSuccess),
      tap(() => {
        router.navigate(['/']);
      }),
    );
  },
  { dispatch: false, functional: true }
);

export const logout = createEffect(
  (
    actions$ = inject<Actions<Action>>(Actions),
    authService = inject(AuthService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        localStorage.removeItem('userData');
        router.navigate(['/auth']);
        authService.clearLogoutTimer();
      })
    )
  },
  { dispatch: false, functional: true }
);
