import { useEffect, useState } from 'react';

import { useRoutes } from 'react-router-dom';

import { LoadingIndicator } from '@/components/loadingIndicator';

import GlobalRoutes from '@/router/global';
import PrivateRoutes from '@/router/private';
import { useAuthService } from '@/service/auth.service';
import { useAuthStore } from '@/store';

import OnLyNotAuthRoutes from './onlyNotAuth';

export const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { bootstrapAuth } = useAuthService();
  const { user } = useAuthStore();

  const initAuth = async () => {
    try {
      if (!user) {
        await bootstrapAuth();
      }
    } finally {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    void initAuth();
  }, []);

  const routing = useRoutes([...PrivateRoutes, ...GlobalRoutes, ...OnLyNotAuthRoutes]);
  if (!isAuthenticated) {
    return <LoadingIndicator />;
  }

  return <>{routing}</>;
};
