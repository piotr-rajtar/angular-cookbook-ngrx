import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/types';

import { authActions } from '../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer!: any;

  constructor(private store: Store<AppState>) { }

  setLogoutTimer(tokenExpirationTimeInMs: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(authActions.logout());
    }, tokenExpirationTimeInMs);
  }

  clearLogoutTimer(): void {
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}
