// InputField.tsx
import { MyInput } from '../ui/MyInput';
import { cn } from '@/common/utils/cn';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import {
  get,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

export const PasswordField = <T extends FieldValues = FieldValues>({
  label,
  name,
  wrapperCn,
  labelCn,
  inputCn,
  eyeBtnCn,
}: InputFieldProps<T>) => {
  const {
    formState: { errors },
  } = useFormContext<T>();
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const fieldError = get(errors, name);
  return (
    <div className={cn('flex flex-col gap-1', wrapperCn)}>
      <label htmlFor={name} className={cn('font-medium', labelCn)}>
        {label}
      </label>
      <div className="relative">
        <MyInput<T>
          type={viewPassword ? 'text' : 'password'}
          id={name}
          className={`${inputCn} py-2 px-4`}
          name={name}
          hasError={!!fieldError}
        />
        <button
          type="button"
          className={cn(
            'text-gray-500 absolute top-5 -translate-1/2 right-0',
            eyeBtnCn
          )}
          onClick={() => setViewPassword((prev) => !prev)}
        >
          {viewPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
      {fieldError && (
        <p className="text-red-500 font-medium text-sm">
          {fieldError.message as string | undefined}
        </p>
      )}
    </div>
  );
};

type InputFieldProps<T extends FieldValues = FieldValues> = {
  name: FieldPath<T>;
  label: string;
  wrapperCn?: string;
  labelCn?: string;
  inputCn?: string;
  eyeBtnCn?: string;
};
