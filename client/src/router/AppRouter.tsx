import { AppLayout } from '@/common/layouts/AppLayout';
import { Home, Order } from '@pages/_index';
import { useRoutes, type RouteObject } from 'react-router-dom';

export const AppRouter = () => {
  const appRouter: RouteObject[] = [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/orders', element: <Order /> },
      ],
    },
  ];

  const router = useRoutes([...appRouter]);

  return router;
};
