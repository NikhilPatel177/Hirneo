// InputField.tsx
import { MyInput } from '../ui/MyInput';
import { cn } from '@/common/utils/cn';
import {
  get,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

export const InputField = <T extends FieldValues = FieldValues>({
  label,
  name,
  type = 'text',
  wrapperCn,
  labelCn,
  inputCn,
}: InputFieldProps<T>) => {
  const {
    formState: { errors },
  } = useFormContext<T>();

  const fieldError = get(errors, name);
  return (
    <div className={cn('flex flex-col gap-1', wrapperCn)}>
      <label htmlFor={name} className={cn('font-medium', labelCn)}>
        {label}
      </label>
      <MyInput<T>
        type={type}
        id={name}
        className={`${inputCn} py-2 px-4`}
        name={name}
        hasError={!!fieldError}
      />
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
  type?: React.HTMLInputTypeAttribute;
  wrapperCn?: string;
  labelCn?: string;
  inputCn?: string;
};
