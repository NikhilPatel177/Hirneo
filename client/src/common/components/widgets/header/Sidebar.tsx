import { Menu, Package, User } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Avatar } from '../../ui/Avatar';
import { MyNavLink } from '../../ui/MyNavLink';
import type { NavlinkType } from '@/common/types/navlinkType';
import { useAuthStore } from '@/common/store/useAuthStore';
import { NavLink } from 'react-router-dom';
import { LogoutButton } from '@/features/auth/buttons/LogoutButton';

const navItems: NavlinkType[] = [
  { label: 'My Profile', href: '/profile', icon: User },
  { label: 'My Orders', href: '/orders', icon: Package },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { user } = useAuthStore();

  return (
    <div className="relative z-50">
      {user ? (
        <NavLink to="/auth" className="font-medium text-gray-500">
          Register
        </NavLink>
      ) : (
        <Menu onClick={() => setIsOpen(true)} />
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[rgba(0,0,0,0.5)] fixed inset-0"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              key="sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 w-60 h-full bg-white"
            >
              <div className="bg-primary p-2 flex items-center gap-2">
                <Avatar className="w-9 h-9" />
                <span className="text-white font-medium text-lg truncate">
                  Nikhil Patel
                </span>
              </div>

              <nav>
                <ul className="p-2">
                  {navItems.map(({ label, href, icon }, index) => (
                    <li key={index}>
                      <MyNavLink
                        to={href}
                        label={label}
                        icon={icon}
                        wrapperCn="p-2"
                      />
                    </li>
                  ))}
                  <hr />
                  <li>
                     <LogoutButton btnCn='px-3'/>
                  </li>
                </ul>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
