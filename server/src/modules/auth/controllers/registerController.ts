import { REFRESHTOKEN_COOKIE_OPTIONS } from '@auth/constants/cookies.js';
import { RegisterType } from '@auth/schemas/registerSchema.js';
import { getFormattedUser } from '@auth/utils/formattedUser.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '@auth/utils/generateTokens.js';
import { generateUniqueUsername } from '@auth/utils/generateUniqueUsername.js';
import UserModel from '@models/userModel.js';
import { RequestHandler } from 'express';

export const registerUser: RequestHandler = async (req, res) => {
  const data = req.validatedData as RegisterType;

  try {
    const user = await UserModel.findOne({ email: data.email });

    if (user) {
      return res.status(400).json({
        message: 'User already exists, Login with it or try another email.',
      });
    }

    const basename = data.email.split('@')[0] || 'user';
    const username = await generateUniqueUsername(basename);
    const newUser = await UserModel.create({
      email: data.email,
      password: data.password,
      roles: data.role,
      username,
      activeRole: data.role[0],
    });
    const refreshToken = generateRefreshToken(newUser);
    const accessToken = generateAccessToken(newUser);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie('refreshToken', refreshToken, REFRESHTOKEN_COOKIE_OPTIONS);

    const userData = getFormattedUser(newUser);
    return res.status(201).json({
      message: 'User registration successfull',
      accessToken,
      userData,
    });
  } catch (error) {
    console.error('Registration failed :', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
