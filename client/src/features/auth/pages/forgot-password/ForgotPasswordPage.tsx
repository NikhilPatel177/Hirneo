import { ForgotPasswordForm } from '../../forms/forgot-password/ForgotPasswordForm';
import { AuthLayout } from '../../layout/AuthLayout';

export const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      title="Forgot Your Password?"
      desc="Enter your email and we'll send you a link to reset it."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};
