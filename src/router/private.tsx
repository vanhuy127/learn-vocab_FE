import React, { lazy } from 'react';

import { Navigate, type RouteObject, useLocation } from 'react-router-dom';

import { ROLE } from '@/constants';
import { ROUTE_PATH } from '@/constants/router';
import { AdminLayout } from '@/layout/admin';
import { DefaultLayout } from '@/layout/default';
import { useAuthStore } from '@/store';

//shared
const MyLibrary = lazy(() => import('@/pages/user/MyLibrary'));
const CreateStudySet = lazy(() => import('@/pages/user/CreateStudySet'));
const EditStudySet = lazy(() => import('@/pages/user/EditStudySet'));
const LearnFlashCard = lazy(() => import('@/pages/user/LearnFlashcard'));
const LearnQuiz = lazy(() => import('@/pages/user/LearnQuiz'));

//user page
const Account = lazy(() => import('@/pages/user/Account'));

//admin page
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));

const PrivateRoute = React.memo(({ children, roles }: { children: React.ReactNode; roles?: string[] }) => {
  const { user } = useAuthStore();
  const location = useLocation();
  if (!user) return <Navigate to={ROUTE_PATH.AUTH.LOGIN} state={{ from: location }} replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to={ROUTE_PATH.UNAUTHORIZE} replace />;

  return <>{children}</>;
});

PrivateRoute.displayName = 'PrivateRoute';

const PrivateRoutes: RouteObject[] = [
  {
    element: (
      <PrivateRoute roles={[ROLE.USER, ROLE.ADMIN]}>
        <DefaultLayout />
      </PrivateRoute>
    ),
    children: [
      { path: ROUTE_PATH.USER.LIBRARY, element: <MyLibrary /> },
      { path: ROUTE_PATH.USER.STUDY_SET.CREATE, element: <CreateStudySet /> },
      { path: ROUTE_PATH.USER.STUDY_SET.EDIT.PATH, element: <EditStudySet /> },
      { path: ROUTE_PATH.USER.STUDY_SET.LEARN_FLASHCARD.PATH, element: <LearnFlashCard /> },
      { path: ROUTE_PATH.USER.STUDY_SET.LEARN_QUIZ.PATH, element: <LearnQuiz /> },
    ],
  },
  {
    element: (
      <PrivateRoute roles={[ROLE.USER]}>
        <DefaultLayout />
      </PrivateRoute>
    ),
    children: [{ path: ROUTE_PATH.USER.ACCOUNT, element: <Account /> }],
  },
  {
    element: (
      <PrivateRoute roles={[ROLE.ADMIN]}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [{ path: ROUTE_PATH.ADMIN.DASHBOARD, element: <Dashboard /> }],
  },
];

export default PrivateRoutes;
