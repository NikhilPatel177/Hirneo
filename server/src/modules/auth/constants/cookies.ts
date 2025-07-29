import env from '@config/env.js';

export const GOOGLE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  maxAge: 15 * 60 * 1000, // 15 minutes
  sameSite: 'none' as const,
<<<<<<< HEAD
  path: '/google',
=======
>>>>>>> 6749da609901c7cc1a196affc61b88549eec753d
};

export const REFRESHTOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  sameSite: 'none' as const,
<<<<<<< HEAD
  path: '/refresh-token',
=======
>>>>>>> 6749da609901c7cc1a196affc61b88549eec753d
};
