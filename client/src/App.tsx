import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppRouter } from './router/AppRouter';
import { useAuthStore } from './common/store/useAuthStore';
import apiInstance from './common/lib/apiInstance';
import { useQueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

function App() {
  const { setToken, clearAuth, setUser } = useAuthStore();
  const [isChecked, setIsChecked] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiInstance.get('auth/refresh-token', {
          withCredentials: true,
        });

        const accessToken = res.data.accessToken;
        setToken(accessToken);

        await queryClient.prefetchQuery({
          queryKey: ['me'],
          queryFn: async () => {
            const res = await apiInstance.get('auth/me');
            return res.data.userData;
          },
        });

        setUser(queryClient.getQueryData(['me']) || null);
      } catch {
        clearAuth();
      } finally {
        setIsChecked(true);
      }
    };

    checkAuth();
  }, [setToken, clearAuth, queryClient, setUser]);

  if (!isChecked) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AppRouter />
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
}

export default App;
