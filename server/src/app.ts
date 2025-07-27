import { authRoutes } from '@auth/authRoutes.js';
import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

export default app;
