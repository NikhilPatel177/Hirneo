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
import { useRegisterMutation } from '../../hooks/useRegisterMutation';
import { LoadingCircle } from '@/common/components/ui/Loaders/LoadingCircle';
import { SuccessTick } from '@/common/components/ui/Success/SuccessTick';

export const RegisterForm = ({ step, setStep }: Props) => {
  const form = useForm<RegisterType>({ resolver: zodResolver(registerSchema) });
  const { setRole } = useGoogleOauthStore();

  const roleHasError = !!form.formState.errors.role;
  const { mutate, isPending, isSuccess } = useRegisterMutation(form.setError);

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

  function handleFormSubmission(data: RegisterType) {
    mutate(data);
  }
  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleFormSubmission)}
      >
        {step === 1 && <StepOne hasError={roleHasError} />}
        {step === 2 && <StepTwo />}
        {step === 1 && <Button onClick={handleNxtStep}>Continue</Button>}
        {step === 2 && (
          <Button type="submit" isDisable={isPending}>
            {isPending ? (
              <LoadingCircle />
            ) : isSuccess ? (
              <SuccessTick />
            ) : (
              'Create Account'
            )}
          </Button>
        )}
      </form>
    </FormProvider>
  );
};

type Props = {
  step: 1 | 2;
  setStep: Dispatch<SetStateAction<1 | 2>>;
};
