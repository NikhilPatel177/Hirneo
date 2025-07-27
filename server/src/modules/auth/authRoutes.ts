import { Router } from 'express';
import {
  handleGoogleOauthCallback,
  redirectToGoogleOauth,
} from './controllers/googleOauthController.js';

const router = Router();

router.get('/google', redirectToGoogleOauth);
router.get('/google/callback', handleGoogleOauthCallback);

export { router as authRoutes };
