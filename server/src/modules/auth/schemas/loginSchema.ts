import z from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or either username is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginType = z.infer<typeof loginSchema>;
