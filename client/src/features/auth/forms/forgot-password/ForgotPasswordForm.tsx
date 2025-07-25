import { InputField } from '@/common/components/forms/InputField';
import { FormProvider, useForm } from 'react-hook-form';
import {
  forgotPasswordSchema,
  type ForgotPasswordType,
} from '../../schemas/passwordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/common/components/ui/Button';

const Input = InputField<ForgotPasswordType>;

export const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema)
  });
  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(data=>console.log(data))}>
        <Input label="Email" name="email" />
        <Button type='submit'>Send Reset Link</Button>
      </form>
    </FormProvider>
  );
};
