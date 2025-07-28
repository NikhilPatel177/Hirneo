import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  email: string;
  username: string;
  fullName: { firstName: string; lastName: string };
  avatarUrl: string;
  password: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  roles: ('client' | 'freelancer')[];
  activeRole: 'client' | 'freelancer';

  isEmailVerified: boolean;
  isPhoneVerified: boolean;

  providers: ('google' | 'credentials')[];
  googleProviderId?: string;

  refreshToken?: string;
  passwordResetToken?: string;

  createdAt: Date;
  updatedAt: Date;

  comparePassword(enteredPassword: string): Promise<boolean>;
}

export const __ensureModule = true;
