import z from 'zod';

export const setPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'New Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmNewPassword: z.string().min(1, 'Confirm new password is required'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Password doesnot match',
  });

export type SetPasswordType = z.infer<typeof setPasswordSchema>;
