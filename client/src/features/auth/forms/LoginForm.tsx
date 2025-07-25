import { InputField } from '@/common/components/forms/InputField';
import { loginSchema, type LoginType } from '../schemas/loginSchema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/common/components/ui/Button';

const Input = InputField<LoginType>;

export const LoginForm = () => {
  const form = useForm<LoginType>({ resolver: zodResolver(loginSchema)});

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((data) => console.log(data))}
      >
        <Input label="Email or Username" name="identifier" />
        <Input label="Password" name="password" />
        <Button type="submit">Login</Button>
      </form>
    </FormProvider>
  );
};
