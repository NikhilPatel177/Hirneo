import { IUser } from './IUser.js';

export type AuthUserType = Pick<
  IUser,
  | 'activeRole'
  | 'avatarUrl'
  | 'createdAt'
  | 'fullName'
  | 'email'
  | 'gender'
  | 'isEmailVerified'
  | 'isPhoneVerified'
  | 'phone'
  | 'username'
  | '_id'
>;
