import type { RouteObject } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { ForgotPasswordPage } from './pages/forgot-password/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/forgot-password/ResetPasswordPage';
import { SetPasswordPage } from './pages/SetPasswordPage';

export const authRoutes: RouteObject[] = [
  { path: '/auth', element: <AuthPage /> },
  { path: '/verify-email', element: <VerifyEmailPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/set-password', element: <SetPasswordPage /> },
];
