import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.user.pipe(
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
