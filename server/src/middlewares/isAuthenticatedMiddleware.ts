import env from '@config/env.js';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticated: RequestHandler = (req, res, next) => {
  let accessToken = req.headers.authorization;

  if (!accessToken || !accessToken.includes('Bearer ')) {
    return res.status(401).json({
      message: 'Invalid or missing token',
    });
  }

  accessToken = accessToken.split(' ')[1];
  try {
    const decodedToken = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);

    if (typeof decodedToken === 'string') {
      return res.status(403).json({ message: 'Invalid token payload' });
    }

    req.user = decodedToken as {
      _id: string;
      activeRole: 'freelancer' | 'client';
      iat: number;
      exp: number;
    };

    next();
  } catch (error) {
    console.error('Token refresh failed:', error);

    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      return res
        .status(401)
        .json({ message: 'Invalid or expired access token' });
    }

    return res.status(500).json({ message: 'Something went wrong' });
  }
};
