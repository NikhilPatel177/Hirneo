import { FormProvider, useForm } from 'react-hook-form';
import {
  resetPasswordSchema,
  type ResetPasswordType,
} from '../../schemas/passwordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/common/components/ui/Button';
import { PasswordField } from '@/common/components/forms/PasswordField';

const Input = PasswordField<ResetPasswordType>;

export const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
  });
  console.log(form.formState.errors);
  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((data) => console.log(data))}
      >
        <Input label="New Password" name="newPassword" />
        <Input label="Confirm New Password" name="confirmNewPassword" />
        <Button type="submit">Reset Password</Button>
      </form>
    </FormProvider>
  );
};
