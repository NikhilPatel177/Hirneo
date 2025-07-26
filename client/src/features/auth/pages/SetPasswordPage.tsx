import { SetPasswordForm } from '../forms/SetPasswordForm';
import { AuthLayout } from '../layout/AuthLayout';

export const SetPasswordPage = () => {
  return (
    <AuthLayout
      title="Set Your Password"
      desc="Choose a good password for your account to get access to it later."
    >
      <SetPasswordForm/>
    </AuthLayout>
  );
};
