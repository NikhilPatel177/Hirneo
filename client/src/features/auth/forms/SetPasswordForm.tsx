import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/common/components/ui/Button';
import { PasswordField } from '@/common/components/forms/PasswordField';
import {
  setPasswordSchema,
  type SetPasswordType,
} from '../schemas/setPasswordSchema';

const Input = PasswordField<SetPasswordType>;

export const SetPasswordForm = () => {
  const form = useForm<SetPasswordType>({
    resolver: zodResolver(setPasswordSchema),
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
        <Button type="submit">Set Password</Button>
      </form>
    </FormProvider>
  );
};
