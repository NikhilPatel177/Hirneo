import type React from 'react';
import AppLogo from '@assets/svg/Hirneo-logo.svg';
import { type LucideIcon } from 'lucide-react';

export const AuthLayout = ({ children, title, desc, icon: Icon }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border border-defaultBorder h-12 py-2 px-4 min-[500px]:px-6 min-[800px]:px-8 min-[500px]:h-14 min-[550px]:bg-default">
        {' '}
        <img
          src={AppLogo}
          alt="Hireneo logo"
          className="w-auto object-cover h-full"
        />
      </header>

      <div className="flex-1 flex justify-center min-[550px]:pt-10 min-[550px]:bg-default">
        <div className="relative w-full h-fit bg-white max-w-lg rounded-xl min-[550px]:shadow-lg min-[550px]:w-110">
          {Icon && (
            <div className="hidden absolute top-0 left-1/2 -translate-1/2 p-2 bg-blue-400 text-white rounded-full min-[550px]:block">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <section className="px-4 flex flex-col items-center pb-2 pt-2 min-[550px]:pt-5">
            <h1 className="font-poppins font-bold text-2xl text-primary">
              {title}
            </h1>
            <p className="text-sm font-inter font-semibold text-mutedTxt">
              {desc}
            </p>
          </section>
          <section className="p-4 min-[550px]:px-6">{children}</section>
        </div>
      </div>
    </div>
  );
};

type Props = {
  children: React.ReactNode;
  title: string;
  desc: string;
  icon?: LucideIcon;
};
