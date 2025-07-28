import { InputField } from '@/common/components/forms/InputField';
import { loginSchema, type LoginType } from '../schemas/loginSchema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/common/components/ui/Button';
import { PasswordField } from '@/common/components/forms/PasswordField';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../hooks/useLoginMutation';
import { LoadingCircle } from '@/common/components/ui/Loaders/LoadingCircle';
import { SuccessTick } from '@/common/components/ui/Success/SuccessTick';

const Input = InputField<LoginType>;
const PasswordInput = PasswordField<LoginType>;

export const LoginForm = () => {
  const form = useForm<LoginType>({ resolver: zodResolver(loginSchema) });
  const { mutate, isPending, isSuccess } = useLoginMutation(form.setError);

  function handleOnSubmit(data: LoginType) {
    mutate(data);
  }
  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Input label="Email or Username" name="identifier" />

        <div className="relative">
          <PasswordInput label="Password" name="password" />
          <Link
            to={'/forgot-password'}
            className="absolute top-0 z-50 text-primary font-medium w-full text-end text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" isDisable={isPending}>
          {isPending ? (
            <LoadingCircle />
          ) : isSuccess ? (
            <SuccessTick />
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </FormProvider>
  );
};
