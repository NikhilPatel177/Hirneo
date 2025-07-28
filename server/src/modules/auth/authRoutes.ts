import { Router } from 'express';
import {
  handleGoogleOauthCallback,
  redirectToGoogleOauth,
} from './controllers/googleOauthController.js';
import { validateSchema } from '@middlewares/validateSchemaMiddlware.js';
import { registerSchema } from './schemas/registerSchema.js';
import { registerUser } from './controllers/registerController.js';
import { loginSchema } from './schemas/loginSchema.js';
import { loginUser } from './controllers/loginController.js';

const router = Router();

router.get('/google', redirectToGoogleOauth);
router.get('/google/callback', handleGoogleOauthCallback);

router.post('/register', validateSchema(registerSchema),registerUser);
router.post('/login', validateSchema(loginSchema),loginUser);

export { router as authRoutes };
