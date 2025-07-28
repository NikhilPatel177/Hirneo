import { REFRESHTOKEN_COOKIE_OPTIONS } from '@auth/constants/cookies.js';
import { LoginType } from '@auth/schemas/loginSchema.js';
import { getFormattedUser } from '@auth/utils/formattedUser.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '@auth/utils/generateTokens.js';
import UserModel from '@models/userModel.js';
import { RequestHandler } from 'express';

export const loginUser: RequestHandler = async (req, res) => {
  const data = req.validatedData as LoginType;
  try {
    const user = await UserModel.findOne({
      $or: [{ email: data.identifier }, { username: data.identifier }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: 'No user found with email you gave' });
    }

    const isPasswordCorrect = await user.comparePassword(data.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ errors: [{ field: 'password', message: 'Invalid password' }] });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, REFRESHTOKEN_COOKIE_OPTIONS);

    const userData = getFormattedUser(user);
    return res.status(200).json({
      message: `Welcome back, ${user.fullName.firstName || 'User'}`,
      accessToken,
      userData,
    });
  } catch (error) {
    console.log('Login failed :', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
