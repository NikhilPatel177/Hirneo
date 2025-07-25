import z from 'zod';

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Must be a valid email address'),
});

export const resetPasswordSchema = z
  .object({
    resetToken: z.string().optional(),
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

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
