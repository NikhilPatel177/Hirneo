import { AuthLayout } from '../layout/AuthLayout';
import successTick from '@assets/images/success.jpg';
import { motion } from 'motion/react';

export const VerifyEmailPage = () => {
  return (
    <AuthLayout title="Email Verified Successfully">
      <div className='p-3'>
        <div className="flex flex-col items-center">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            src={successTick}
            alt="Success"
            className="w-30 h-30 object-contain"
          />
        </div>
      </div>
    </AuthLayout>
  );
};
