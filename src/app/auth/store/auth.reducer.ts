import { createReducer, on } from '@ngrx/store';

import { User } from '../models/user'

import { authActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.login, (state, action) => {
    const user = new User(
      action.loginData.email,
      action.loginData.userId,
      action.loginData.token,
      action.loginData.expirationDate
    );
    return {
      ...state,
      user,
    };
  }),
  on(authActions.logout, state => {
    return {
      ...state,
      user: null,
    };
  }),
);
