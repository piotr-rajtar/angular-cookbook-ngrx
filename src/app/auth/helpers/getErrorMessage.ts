import { HttpErrorResponse } from '@angular/common/http';

import {
  AUTH_ERROR_KEYS,
  SIGN_IN_ERROR_KEY,
  SIGN_UP_ERROR_KEY,
} from '../models';

export const getErrorMessage = (errorResponce: HttpErrorResponse): string => {
  const errorKey: AUTH_ERROR_KEYS | undefined = errorResponce.error?.error?.message;

  if(!errorKey) {
    const errorMessage = 'An unknown error occured';
    return errorMessage;
  }

  const errorMessages: Record<AUTH_ERROR_KEYS, string> = {
    [SIGN_IN_ERROR_KEY.INVALID_LOGIN_CREDENTIALS]: 'Login credentials are incorrect',
    [SIGN_IN_ERROR_KEY.USER_DISABLED]: 'User account has been disabled',
    [SIGN_UP_ERROR_KEY.EMAIL_EXISTS]: 'This email exists already',
    [SIGN_UP_ERROR_KEY.OPERATION_NOT_ALLOWED]: 'Tha password has been disabled',
    [SIGN_UP_ERROR_KEY.TOO_MANY_ATTEMPTS_TRY_LATER]: 'Too many sign up attampts. Please try again later',
  }

  const errorMessage = errorMessages[errorKey] || 'An unknown error occured';

  return errorMessage;
}
