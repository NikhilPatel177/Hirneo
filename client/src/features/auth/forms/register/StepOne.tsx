import { useFormContext, useWatch } from 'react-hook-form';
import type { RegisterType } from '../../schemas/registerSchema';
import { BriefcaseBusiness, UserCheck } from 'lucide-react';
import { cn } from '@/common/utils/cn';
import { motion } from 'motion/react';
import { useEffect } from 'react';

export const StepOne = ({ hasError }: StepOneProps) => {
  const {
    register,
    formState: { errors },
    clearErrors,
    control,
  } = useFormContext<RegisterType>();

  const role = useWatch({ control, name: 'role' });

  useEffect(() => {
    if (role?.length > 0) {
      clearErrors('role');
    }
  }, [role, clearErrors]);

  return (
    <>
      {hasError && (
        <p className="text-center text-red-500 font-medium">
          {errors.role?.message}
        </p>
      )}
      <fieldset className="grid gap-4">
        <input
          type="checkbox"
          id="client"
          value="client"
          {...register('role')}
          className="peer hidden"
        />

        <motion.label
          htmlFor="client"
          animate={hasError ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            'space-y-2 border-2 text-gray-600 p-4 rounded-md cursor-pointer peer-checked:bg-indigo-50 peer-checked:text-primary',
            hasError && 'border-red-500',
            !hasError && 'border-defaultBorder'
          )}
        >
          <BriefcaseBusiness />
          <p className="font-medium text-lg">I'm a client, I'm here to hire.</p>
        </motion.label>
      </fieldset>

      <fieldset className="grid gap-4">
        <input
          type="checkbox"
          id="freelancer"
          value="freelancer"
          {...register('role')}
          className="peer hidden"
        />

        <motion.label
          animate={hasError ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          htmlFor="freelancer"
          className={cn(
            'space-y-2 border-2 text-gray-600 p-4 rounded-md cursor-pointer peer-checked:bg-indigo-50 peer-checked:text-primary',
            hasError && 'border-red-500',
            !hasError && 'border-defaultBorder'
          )}
        >
          <UserCheck />
          <p className="font-medium text-lg">
            I'm a freelancer, I'm here to be hired.
          </p>
        </motion.label>
      </fieldset>
    </>
  );
};

type StepOneProps = {
  hasError: boolean;
};
