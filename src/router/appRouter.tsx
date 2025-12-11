import { useEffect, useState } from 'react';

import { useRoutes } from 'react-router-dom';

import { LoadingIndicator } from '@/components/loadingIndicator';

import { LOCAL_STORAGE_KEY } from '@/constants';
import GlobalRoutes from '@/router/global';
import PrivateRoutes from '@/router/private';
import { useAuthService } from '@/service/auth.service';
import { useAuthStore } from '@/store';
import { getLocalStorage } from '@/utils';

import OnLyNotAuthRoutes from './onlyNotAuth';

export const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getMe } = useAuthService();
  const { user } = useAuthStore();

  const initAuth = async () => {
    try {
      const token = getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      if (token && !user) {
        await getMe();
      }
    } finally {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const routing = useRoutes([...PrivateRoutes, ...GlobalRoutes, ...OnLyNotAuthRoutes]);
  if (!isAuthenticated) {
    return <LoadingIndicator />;
  }

  return <>{routing}</>;
};
