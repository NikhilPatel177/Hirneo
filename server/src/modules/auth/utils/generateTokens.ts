import { IUser } from 'types/IUser.js';
import jwt from 'jsonwebtoken';
import env from '@config/env.js';

export const generateAccessToken = (user: IUser): string => {
  return jwt.sign(
    { _id: user._id, activeRole: user.activeRole },
    env.ACCESS_TOKEN_SECRET,
    { expiresIn: env.ACCESS_TOKEN_EXPIRY } as jwt.SignOptions
  );
};

export const generateRefreshToken = (user: IUser): string => {
  return jwt.sign(
    { _id: user._id, activeRole: user.activeRole },
    env.REFRESH_TOKEN_SECRET,
    { expiresIn: env.REFRESH_TOKEN_EXPIRY } as jwt.SignOptions
  );
};
