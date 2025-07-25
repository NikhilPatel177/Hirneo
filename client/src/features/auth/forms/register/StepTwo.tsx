import { InputField } from '@/common/components/forms/InputField';
import type { RegisterType } from '../../schemas/registerSchema';

const Input = InputField<RegisterType>;

export const StepTwo = () => {
  return (
    <>
      <Input label="Email" name="email" />
      <Input label="Password" name="password" />
    </>
  );
};
