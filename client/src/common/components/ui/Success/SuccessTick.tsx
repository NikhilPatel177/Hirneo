import { AnimatePresence, motion } from 'motion/react';

export const SuccessTick = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="flex items-center justify-center w-7 h-7 rounded-full border-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        <motion.span
          className="text-lg font-bold"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.3,
            ease: 'easeOut',
          }}
        >
          ✔
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
};
