import { createReducer, on } from '@ngrx/store';

import { User } from '../models/user'

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
);
