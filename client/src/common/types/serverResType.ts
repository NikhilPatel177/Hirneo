import type { AuthUserType } from './authUserType';

export type SuccessResponse = {
  message?: string;
  userData?: AuthUserType;
  accessToken?: string;
};

export type ErrorResponse = {
  message?: string;
  errors?: { field: string; message: string }[];
};
