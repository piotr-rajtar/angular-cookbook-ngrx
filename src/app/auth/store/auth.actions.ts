import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { LoginData } from '../models';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ loginData: LoginData }>(),
    'Logout': emptyProps(),
  }
})
