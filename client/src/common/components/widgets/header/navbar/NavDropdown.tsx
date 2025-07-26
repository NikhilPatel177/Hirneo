import type { SetStateAction } from 'react';
import type React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { NavlinkType } from '@/common/types/navlinkType';
import { MyNavLink } from '@/common/components/ui/MyNavLink';
import { Package } from 'lucide-react';
import { LogoutButton } from '@/features/auth/buttons/LogoutButton';

const items: NavlinkType[] = [
  { label: 'Orders', href: '/orders', icon: Package },
  { label: 'Orders', href: '/orders', icon: Package },
  { label: 'Orders', href: '/orders', icon: Package },
  { label: 'Orders', href: '/orders', icon: Package },
  { label: 'Orders', href: '/orders', icon: Package },
  { label: 'Orders', href: '/orders', icon: Package },
  { label: 'Orders', href: '/orders', icon: Package },
  { label: 'Orders', href: '/orders', icon: Package },
  { label: 'Orders', href: '/orders', icon: Package },
  { label: 'Orders', href: '/orders', icon: Package },
];

export const NavDropdown = ({ isOpen, setIsOpen }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dropdown"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'keyframes' }}
          className="absolute w-60 bg-white shadow right-2 top-8 rounded-lg p-2"
          onMouseLeave={() => setIsOpen(false)}
        >
          <ul>
            {items.map(({ href, label, icon }) => (
              <li>
                <MyNavLink
                  to={href}
                  label={label}
                  icon={icon}
                  wrapperCn="px-4 py-2"
                />
              </li>
            ))}
            <hr />
            <li>
              <LogoutButton />
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};
