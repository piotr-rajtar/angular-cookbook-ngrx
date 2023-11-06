import { createSelector } from '@ngrx/store';

import { AppState } from '../../store/types';

import { AuthState } from './auth.reducer';

export const selectAuthState = (state: AppState) => state.auth;

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
