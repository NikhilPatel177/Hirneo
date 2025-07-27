import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default('3000'),
  MONGO_URI: z.string().url(),
  FRONTEND_URI: z.string().url(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),

  GOOGLE_CLIENT_REDIRECT_URI: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string().default('7d'),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string().default('15m'),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const errors = result.error.errors.map((e) => ({
    path: e.path.join(''),
    message: e.message,
  }));

  console.log('ENV variables error ❌', errors);
  process.exit(1);
}

const env = result.data;
export default env;
