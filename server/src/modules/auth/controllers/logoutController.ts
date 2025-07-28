import { REFRESHTOKEN_COOKIE_OPTIONS } from '@auth/constants/cookies.js';
import UserModel from '@models/userModel.js';
import { RequestHandler } from 'express';

export const logoutUser: RequestHandler = async (req, res) => {
  const user = req.user;

  if (!user?._id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const isUser = await UserModel.findById(user._id);
    if (!isUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    isUser.refreshToken = undefined;
    await isUser.save();

    res.clearCookie('refreshToken', REFRESHTOKEN_COOKIE_OPTIONS);
    return res.status(200).json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.log('Logout failed :', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
