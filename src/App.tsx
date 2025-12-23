import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@/components/themeProvider';
import { Toaster } from '@/components/ui/sonner';

import { AppRouter } from '@/router/appRouter';

import ModalRoot from './components/ModelRoot';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-center" duration={3000} />

        <BrowserRouter>
          <AppRouter />
          <ModalRoot />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
