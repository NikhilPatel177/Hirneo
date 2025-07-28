import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <Toaster position='top-right'/>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
