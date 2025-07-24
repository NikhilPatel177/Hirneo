import AppLogo from '@assets/svg/Hirneo-logo.svg';
import { Sidebar } from './Sidebar';
import { Navbar } from './navbar/Navbar';
import { SearchForm } from './SearchForm';

export const Header = () => {
  return (
    <>
      <header className='font-poppins'>
        <div className="h-12 px-4 py-2 flex gap-4 justify-between items-center min-[500px]:flex-row min-[500px]:px-6 min-[800px]:px-8 min-[500px]:h-14 min-[500px]:border min-[500px]:border-defaultBorder">
          <img
            src={AppLogo}
            alt="Hirneo logo"
            className="w-auto object-cover h-full"
          />

          <div className="hidden flex-1 min-[500px]:block">
            <SearchForm />
          </div>

          <div className="min-[500px]:hidden">
            <Sidebar />
          </div>

          <div className="hidden min-[500px]:block">
            <Navbar />
          </div>
        </div>
        <div className='max-w-150 w-full mx-auto px-4 min-[500px]:hidden'><SearchForm/></div>
      </header>
    </>
  );
};
