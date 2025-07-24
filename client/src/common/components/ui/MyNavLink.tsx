import { cn } from '@/common/utils/cn';
import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const MyNavLink = ({
  icon: Icon,
  to,
  label,
  wrapperCn,
  iconCn,
  labelCn,
}: Props) => {
  return (
    <NavLink
      to={to}
      className={cn(
        'cursor-pointer rounded-md flex items-center gap-2 text-gray-500 font-medium hover:text-primary hover:bg-blue-50',
        wrapperCn
      )}
    >
      {Icon && <Icon className={cn('w-5 h-5', iconCn)} />}
      <span className={cn(labelCn)}>{label}</span>
    </NavLink>
  );
};

type Props = {
  to: string;
  icon?: LucideIcon;
  label: string;
  wrapperCn?: string;
  iconCn?: string;
  labelCn?: string;
};
