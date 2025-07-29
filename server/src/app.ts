import { authRoutes } from '@auth/authRoutes.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import env from '@config/env.js';

const app = express();

console.log(env.FRONTEND_URI)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: env.FRONTEND_URI, credentials: true }));

app.use('/api/auth', authRoutes);

export default app;
