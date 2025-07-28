import { AuthUserType } from 'types/authUserType.js';
import { IUser } from 'types/IUser.js';

export const getFormattedUser = (user: IUser): AuthUserType => {
  return {
    _id: user._id,
    activeRole: user.activeRole,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
    email: user.email,
    fullName: user.fullName,
    gender: user.gender,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    phone: user.phone,
    username: user.username,
  };
};
