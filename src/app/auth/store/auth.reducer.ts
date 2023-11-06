import { createReducer, on } from '@ngrx/store';

import { User } from '../models/user'

import { authActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  authError: string | null;
  isLoading: boolean;
  user: User | null;
}

const initialState: AuthState = {
  authError: null,
  isLoading: false,
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.authenticationSuccess, (state, action) => {
    const user = new User(
      action.loginData.email,
      action.loginData.userId,
      action.loginData.token,
      action.loginData.expirationDate
    );
    return {
      ...state,
      authError: null,
      isLoading: false,
      user,
    };
  }),
  on(authActions.authenticationError, (state, action) => {
    return {
      ...state,
      authError: action.errorMessage,
      isLoading: false,
      user: null,
    };
  }),
  on(authActions.clearError, state => {
    return {
      ...state,
      authError: null,
    };
  }),
  on(
    authActions.signIn,
    authActions.signUp,
    state => {
      return {
        ...state,
        authError: null,
        isLoading: true,
      };
    }
  ),
  on(authActions.logout, state => {
    return {
      ...state,
      user: null,
    };
  }),
);
