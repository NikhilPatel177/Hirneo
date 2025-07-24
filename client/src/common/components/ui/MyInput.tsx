import { cn } from '@utils/cn';
import type React from 'react';

export const MyInput = ({ className, type = 'text' }: MyInputProps) => {
  return (
    <input
      type={type}
      className={cn(
        'w-full max-w-100 border-2 border-defaultBorder py-1 px-3 rounded-md  hover:border-borderHvr focus:border-primary focus-within:outline-0',
        className
      )}
    />
  );
};

type MyInputProps = {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
};
