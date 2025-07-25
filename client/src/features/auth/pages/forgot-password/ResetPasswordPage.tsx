import { ResetPasswordForm } from '../../forms/forgot-password/ResetPasswordForm';
import { AuthLayout } from '../../layout/AuthLayout';

export const ResetPasswordPage = () => {
  return (
    <AuthLayout
      title="Reset Your Password"
      desc="Set a strong password to regain access to your account."
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
};
