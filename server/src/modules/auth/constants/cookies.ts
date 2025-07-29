import env from '@config/env.js';

export const GOOGLE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  maxAge: 15 * 60 * 1000, // 15 minutes
  sameSite: 'none' as const,
  path: '/google',
};

export const REFRESHTOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  sameSite: 'none' as const,
  path: '/',
};
