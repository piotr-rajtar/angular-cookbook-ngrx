import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';

import { AppState } from '../../../store/types';

import { selectAuthUser } from '../../store/auth.selectors';

export const authGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const store = inject(Store<AppState>);

  return store.select(selectAuthUser).pipe(
    take(1),
    map(user => {
      const isAuth: boolean = !!user;

      if(!isAuth) {
        return router.createUrlTree(['/auth']);
      }

      return isAuth;
    }),
  );
};
