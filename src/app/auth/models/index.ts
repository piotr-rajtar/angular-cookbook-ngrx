export enum SIGN_UP_ERROR_KEY {
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
  TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER',
}

export enum SIGN_IN_ERROR_KEY {
  INVALID_LOGIN_CREDENTIALS = 'INVALID_LOGIN_CREDENTIALS',
  USER_DISABLED = 'USER_DISABLED',
}

export type AUTH_ERROR_KEYS = SIGN_IN_ERROR_KEY | SIGN_UP_ERROR_KEY;

export interface AuthFormData {
  email: string;
  password: string;
}

export interface SignUpResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
}

export interface SignInResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered: boolean;
}
