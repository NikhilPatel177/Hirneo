import {
  GOOGLE_COOKIE_OPTIONS,
  REFRESHTOKEN_COOKIE_OPTIONS,
} from '@auth/constants/cookies.js';
import { generateRefreshToken } from '@auth/utils/generateTokens.js';
import { generateUniqueUsername } from '@auth/utils/generateUniqueUsername.js';
import env from '@config/env.js';
import UserModel from '@models/userModel.js';
import * as arctic from 'arctic';
import { RequestHandler } from 'express';

const google = new arctic.Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_CLIENT_REDIRECT_URI
);

export const redirectToGoogleOauth: RequestHandler = async (req, res) => {
  try {
    const state = arctic.generateState();
    const codeVerifier = arctic.generateCodeVerifier();
    const scopes = ['openid', 'profile', 'email'];

    const roleSelected = req.query.role as string;
    const redirectTo = req.query?.redirectTo as string;
    const isRole = roleSelected !== 'NA' ? true : false;

    const url = google.createAuthorizationURL(state, codeVerifier, scopes);

    res.cookie('state', state, GOOGLE_COOKIE_OPTIONS);

    res.cookie('codeVerifier', codeVerifier, GOOGLE_COOKIE_OPTIONS);

    if (isRole) {
      res.cookie('oauthRole', roleSelected, GOOGLE_COOKIE_OPTIONS);
    }
    if (redirectTo) {
      res.cookie('oauthRedirectTo', redirectTo, GOOGLE_COOKIE_OPTIONS);
    }
    return res.redirect(url.toString());
  } catch (error) {
    console.error('Google Oauth redirection failed :', error);
    return res.redirect(`${env.FRONTEND_URI}/google/failed`);
  }
};

export const handleGoogleOauthCallback: RequestHandler = async (req, res) => {
  try {
    const code = req.query.code;
    const codeVerifier = req.cookies.codeVerifier;
    const role = req.cookies?.oauthRole || 'client';
    const redirectTo = req.cookies?.oauthRedirectTo || '/';

    if (!code || typeof code !== 'string' || !codeVerifier) {
      return res.redirect(`${env.FRONTEND_URI}/google/failed`);
    }

    const token = await google.validateAuthorizationCode(code, codeVerifier);
    const idToken = token.idToken();
    const claims = arctic.decodeIdToken(idToken) as ClaimsType;

    let isUser = await UserModel.findOne({ email: claims.email });

    if (!isUser) {
      const basename = claims.name || claims.email.split('@')[0] || 'user';
      const username = await generateUniqueUsername(basename);

      isUser = await UserModel.create({
        email: claims.email,
        avatarUrl: claims.picture,
        isEmailVerified: true,
        username,
        fullName: {
          firstName: claims.given_name,
          lastName: claims.family_name,
        },
        providers: ['google'],
        googleProviderId: claims.sub,
        roles: role ? role.split(',') : ['client'],
        activeRole: role && role === 'freelancer' ? 'freelancer' : 'client',
      });
    } else {
      if (!isUser.googleProviderId && !isUser.providers.includes('google')) {
        isUser.isEmailVerified = true;
        isUser.providers.push('google');
        isUser.googleProviderId = claims.sub;
      }
    }

    const refreshToken = generateRefreshToken(isUser);
    isUser.refreshToken = refreshToken;
    await isUser.save();

    res.clearCookie('oauthRole');
    res.clearCookie('oauthRedirectTo');
    res.clearCookie('state');
    res.clearCookie('codeVerifier');
    res.cookie('refreshToken', refreshToken, REFRESHTOKEN_COOKIE_OPTIONS);

    return res.redirect(`${env.FRONTEND_URI}${redirectTo || '/'}`);
  } catch (error) {
    console.error('Google Oauth completion failed :', error);
    return res.redirect(`${env.FRONTEND_URI}/google/failed`);
  }
};

type ClaimsType = {
  sub: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  email: string;
  iss: string;
  azp: string;
  aud: string;
  at_hash: string;
  email_verified: boolean;
};
