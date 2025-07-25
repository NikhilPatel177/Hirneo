import { Avatar } from '@components/ui/Avatar';
import { MyNavLink } from '@components/ui/MyNavLink';
import type { NavlinkType } from '@/common/types/navlinkType';
import { cn } from '@utils/cn';
import { Heart, Mail, Package } from 'lucide-react';
import { NavDropdown } from './NavDropdown';
import { useState } from 'react';
import { useAuthStore } from '@/common/store/useAuthStore';
import { useLocation } from 'react-router-dom';
// import { Avatar } from '@components/ui/Avatar';

const navItems: NavlinkType[] = [
  { href: '/orders', label: 'Orders', icon: Package },
  { href: '/favourites', label: 'Favourites', icon: Heart },
  { href: '/messages', label: 'Messages', icon: Mail },
];

export const Navbar = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const { user } = useAuthStore();
  return (
    <>
      <nav className="text-gray-500 font-medium">
        <ul className="flex items-center min-[800px]:gap-3">
          {navItems.map(({ label, href, icon }) => (
            <li key={href}>
              <MyNavLink
                label={label}
                to={href}
                icon={icon}
                wrapperCn={cn(
                  'gap-1 py-1 px-2',
                  label === 'Orders' && 'hidden min-[1000px]:flex',
                  label === 'Messages' && 'hidden min-[900px]:flex',
                  label === 'Favourites' && 'hidden min-[800px]:flex'
                )}
              />
            </li>
          ))}

          {!user ? (
            <>
              <MyNavLink
                to={`/auth?mode=login&from=${encodeURIComponent(location.pathname)}`}
                label="Login"
                wrapperCn="hidden min-[800px]:flex p-2"
              />
              <MyNavLink
                to={`/auth?mode=register&from=${encodeURIComponent(location.pathname)}`}
                label="Register"
                wrapperCn="p-2"
              />
            </>
          ) : (
            <li className="relative">
              <button
                type="button"
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setDropdownIsOpen(true)}
              >
                <Avatar className="w-6 h-6" />
                <span>Nikhil</span>
              </button>
              <NavDropdown
                isOpen={dropdownIsOpen}
                setIsOpen={setDropdownIsOpen}
              />
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};
