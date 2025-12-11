import React, { lazy } from 'react';

import { Navigate, type RouteObject } from 'react-router-dom';

import { ROLE } from '@/constants';
import { ROUTE_PATH } from '@/constants/router';
import { AuthLayout } from '@/layout/auth';
import { useAuthStore } from '@/store';

const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));

const OnLyNotAuthRoute = React.memo(({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  if (user?.role === ROLE.ADMIN) return <Navigate to={ROUTE_PATH.ADMIN.DASHBOARD} />;
  if (user?.role === ROLE.USER) return <Navigate to={ROUTE_PATH.USER.HOME} />;

  return <>{children}</>;
});

OnLyNotAuthRoute.displayName = 'OnLyNotAuthRoute';

const OnLyNotAuthRoutes: RouteObject[] = [
  {
    element: (
      <OnLyNotAuthRoute>
        <AuthLayout />
      </OnLyNotAuthRoute>
    ),
    children: [
      { path: ROUTE_PATH.AUTH.LOGIN, element: <Login /> },
      { path: ROUTE_PATH.AUTH.REGISTER, element: <Register /> },
    ],
  },
];

export default OnLyNotAuthRoutes;
