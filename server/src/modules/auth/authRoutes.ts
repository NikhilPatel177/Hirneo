import { Router } from 'express';
import {
  handleGoogleOauthCallback,
  redirectToGoogleOauth,
} from './controllers/googleOauthController.js';
import { validateSchema } from '@middlewares/validateSchemaMiddlware.js';
import { registerSchema } from './schemas/registerSchema.js';
import { registerUser } from './controllers/registerController.js';

const router = Router();

router.get('/google', redirectToGoogleOauth);
router.get('/google/callback', handleGoogleOauthCallback);

router.post('/register', validateSchema(registerSchema),registerUser);

export { router as authRoutes };
