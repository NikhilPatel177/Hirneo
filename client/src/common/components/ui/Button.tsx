import { cn } from '@/common/utils/cn';

export const Button = ({
  className,
  type = 'button',
  children,
  onClick,
  isDisable,
}: Props) => {
  return (
    <button
      type={type}
      className={cn(
        'text-white font-medium font-poppins bg-primary w-full p-2 rounded-md flex items-center justify-center hover:bg-primary-hover',
        className
      )}
      onClick={onClick}
      disabled={isDisable}
    >
      {children}
    </button>
  );
};

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  isDisable?: boolean;
};
