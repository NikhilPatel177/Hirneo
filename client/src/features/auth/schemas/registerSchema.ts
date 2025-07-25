import z from 'zod';

export const registerSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  role: z
    .array(z.enum(['client', 'freelancer']))
    .min(1, 'Atleast one role is required'),
});

export type RegisterType = z.infer<typeof registerSchema>;
