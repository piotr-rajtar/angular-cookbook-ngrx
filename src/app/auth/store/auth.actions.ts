import { createActionGroup, createAction, emptyProps, props } from '@ngrx/store';

import { AuthFormData, LoginData } from '../models';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'AuthenticationSuccess': props<{ loginData: LoginData }>(),
    'AuthenticationError': props<{ errorMessage: string }>(),
    'AutoLogin': emptyProps(),
    'ClearError': emptyProps(),
    'SignIn': props<{ authFormData: AuthFormData }>(),
    'SignUp': props<{ authFormData: AuthFormData }>(),
    'Logout': emptyProps(),
  },
});

