import { FormProvider, useForm } from 'react-hook-form';
import {
  registerSchema,
  type RegisterType,
} from '../../schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Dispatch, type SetStateAction } from 'react';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { Button } from '@/common/components/ui/Button';
import { useGoogleOauthStore } from '../../store/useGoogleOauthStore';

export const RegisterForm = ({ step, setStep }: Props) => {
  const form = useForm<RegisterType>({ resolver: zodResolver(registerSchema) });
  const { setRole } = useGoogleOauthStore();

  const roleHasError = !!form.formState.errors.role;

  async function handleNxtStep() {
    const isValid = await form.trigger('role');

    if (isValid) {
      const selectedRoles = form.getValues('role');
      setRole(selectedRoles);
      setStep(2);
    } else {
      form.setError('role', {
        message: 'Please select one or both among these two.',
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(
          (data) => {
            console.log('✅ Form submitted:', data);
          },
          (errors) => console.log('❌ Validation errors:', errors)
        )}
      >
        {step === 1 && <StepOne hasError={roleHasError} />}
        {step === 2 && <StepTwo />}
        {step === 1 && <Button onClick={handleNxtStep}>Continue</Button>}
        {step === 2 && <Button type="submit">Create Account</Button>}
      </form>
    </FormProvider>
  );
};

type Props = {
  step: 1 | 2;
  setStep: Dispatch<SetStateAction<1 | 2>>;
};
