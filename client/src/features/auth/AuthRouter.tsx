import type { RouteObject } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';

export const authRoutes: RouteObject[] = [
  { path: '/auth', element: <AuthPage/> },
];
