import { cn } from '@/common/utils/cn';
import { LogOut } from 'lucide-react';

export const LogoutButton = ({
  btnCn,
  iconCn,
  textCn,
  showIcon = true,
}: LogoutButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'text-red-500 font-medium hover:bg-red-50 w-full flex items-center gap-2 px-4 py-2 rounded-md',
        btnCn
      )}
    >
      {showIcon && <LogOut className={cn('w-5 h-5', iconCn)} />}
      <span className={textCn}>Logout</span>
    </button>
  );
};

type LogoutButtonProps = {
  btnCn?: string;
  iconCn?: string;
  textCn?: string;
  showIcon?: boolean;
};
