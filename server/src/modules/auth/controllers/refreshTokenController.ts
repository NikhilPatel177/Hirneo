import { REFRESHTOKEN_COOKIE_OPTIONS } from '@auth/constants/cookies.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '@auth/utils/generateTokens.js';
import env from '@config/env.js';
import UserModel from '@models/userModel.js';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const refreshingToken: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: 'No refresh token provided' });
  }

  console.log(refreshToken)
  try {
    const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET) as {
      _id: string;
    };

    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    console.log(decoded)
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('refreshToken', newRefreshToken, REFRESHTOKEN_COOKIE_OPTIONS);

    return res.status(200).json({
      message: 'Tokens refreshed successfully',
      accessToken,
    });
  } catch (error) {
    console.error('Token refresh failed:', error);

    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      res.clearCookie('refreshToken', REFRESHTOKEN_COOKIE_OPTIONS);
      return res
        .status(403)
        .json({ message: 'Invalid or expired refresh token' });
    }

    return res.status(500).json({ message: 'Something went wrong' });
  }
};
