// MyInput.tsx
import { cn } from '@utils/cn';
import type React from 'react';
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { motion } from 'motion/react';

function setAutocomplete(name: string): React.HTMLInputAutoCompleteAttribute {
  const loweredName = name.toLowerCase();
  if (loweredName === 'email') return 'email';
  if (loweredName === 'password' || loweredName.includes('password'))
    return 'current-password';

  return 'on';
}

export const MyInput = <T extends FieldValues = FieldValues>({
  className,
  type = 'text',
  id,
  name,
  hasError,
  autoComplete,
}: MyInputProps<T>) => {
  const { register } = useFormContext<T>(); // T will be inferred from FormProvider

  return (
    <motion.input
      animate={hasError ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      type={type}
      className={cn(
        'block w-full max-w-120 border-2 py-1 px-3 rounded-md focus:border-primary focus-within:outline-0',
        hasError && 'border-red-500 hover:border-red-400 focus:border-red-400',
        !hasError && 'border-defaultBorder hover:border-borderHvr',
        className
      )}
      id={id}
      {...register(name)}
      autoComplete={autoComplete ?? setAutocomplete(name)}
    />
  );
};

type MyInputProps<T extends FieldValues = FieldValues> = {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  name: FieldPath<T>;
  hasError?: boolean;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
};
