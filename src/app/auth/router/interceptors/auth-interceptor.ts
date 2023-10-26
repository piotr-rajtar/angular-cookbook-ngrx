import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
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
