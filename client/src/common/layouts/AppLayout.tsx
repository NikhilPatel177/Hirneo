import { Header, Footer } from '@components/widgets/_index';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
