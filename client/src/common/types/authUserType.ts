export type AuthUserType = {
  _id: string;
  email: string;
  username: string;
  fullName: { firstName: string; lastName: string };
  avatarUrl: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  activeRole: 'client' | 'freelancer';

  isEmailVerified: boolean;
  isPhoneVerified: boolean;

  createdAt: Date;
};