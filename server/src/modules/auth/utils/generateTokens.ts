import { IUser } from 'types/IUser.js';
import jwt from 'jsonwebtoken';
import env from '@config/env.js';


export const generateAccessToken = async (user: IUser): Promise<string> => {
  return jwt.sign(
    { _id: user._id, activeRole: user.activeRole },
    env.ACCESS_TOKEN_SECRET,
    { expiresIn: env.ACCESS_TOKEN_EXPIRY } as jwt.SignOptions
  );
};

export const generateRefreshToken = async (user: IUser): Promise<string> => {
  return jwt.sign(
    { _id: user._id, activeRole: user.activeRole },
    env.ACCESS_TOKEN_SECRET,
    { expiresIn: env.ACCESS_TOKEN_EXPIRY } as jwt.SignOptions
  );
};