import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, exhaustMap, take } from 'rxjs';

import { AppState } from '../../../store/types';

import { selectAuthUser } from '../../store/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectAuthUser).pipe(
      take(1),
      //exhaustMap, czeka jak skończy się userObservable, następnie zastępuje go w łańuchu observabli
      //dlatego dalej zwracamy Observabla z HttpEvent
      exhaustMap(user => {
        //obejście, żeby nie dodawało paramsów przy logowaniu się lub rejestracji
        if(!user) {
          return next.handle(request);
        }
        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', user?.token as string),
        });
        return next.handle(modifiedRequest);
      }),
    );
  }
}
