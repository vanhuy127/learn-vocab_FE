import { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import ScrollToTopButton from '@/components/scrollToTopButton';
import { ThemeProvider } from '@/components/themeProvider';
import { Toaster } from '@/components/ui/sonner';

import { AppRouter } from '@/router/appRouter';

import ModalRoot from './components/ModelRoot';
import { useAuthStore, useSocketStore } from './store';

const queryClient = new QueryClient();

function App() {
  const { accessToken } = useAuthStore();
  const { connectSocket, disconnectSocket } = useSocketStore();

  useEffect(() => {
    if (accessToken) {
      connectSocket(accessToken);
    } else {
      disconnectSocket();
    }

    return () => disconnectSocket();
  }, [accessToken, connectSocket, disconnectSocket]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-center" duration={3000} />

        <BrowserRouter>
          <AppRouter />
          <ScrollToTopButton />
          <ModalRoot />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
