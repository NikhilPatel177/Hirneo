import { getFormattedUser } from '@auth/utils/formattedUser.js';
import UserModel from '@models/userModel.js';
import { RequestHandler } from 'express';

export const getUser: RequestHandler = async (req, res) => {
  const user = req.user;

  if (!user?._id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const isUser = await UserModel.findById(user._id);
    if (!isUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = getFormattedUser(isUser);
    return res.status(200).json({
      message: 'User data fetched successfully',
      userData,
    });
  } catch (error) {
    console.log('Get user failed :', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
