import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer} from 'react-toastify';

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ToastContainer position='top-right'/>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
