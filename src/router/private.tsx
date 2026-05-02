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
const LearnReview = lazy(() => import('@/pages/user/LearnReview'));
const CreateTest = lazy(() => import('@/pages/user/CreateTest'));
const EditTest = lazy(() => import('@/pages/user/EditTest'));
const TestOverview = lazy(() => import('@/pages/user/TestOverview'));
const TestTaking = lazy(() => import('@/pages/user/TestTaking'));
const TestResult = lazy(() => import('@/pages/user/TestResult'));
const TestStats = lazy(() => import('@/pages/user/TestStats'));
const VocabBattleMatchmaking = lazy(() => import('@/pages/user/VocabBattleMatchmaking'));
const VocabBattleRoom = lazy(() => import('@/pages/user/VocabBattleRoom'));

//user page
const Account = lazy(() => import('@/pages/user/Account'));

//admin page
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const UserList = lazy(() => import('@/pages/admin/user'));
const UserDetails = lazy(() => import('@/pages/admin/user/Details'));
const StudySetList = lazy(() => import('@/pages/admin/studySet'));
const StudySetDetails = lazy(() => import('@/pages/admin/studySet/Details'));

const PrivateRoute = React.memo(({ children, roles }: { children: React.ReactNode; roles?: string[] }) => {
  const { user } = useAuthStore();
  const location = useLocation();
  if (!user)
    return (
      <Navigate
        to={`${ROUTE_PATH.AUTH.LOGIN}?redirect=${encodeURIComponent(location.pathname)}`}
        state={{ from: location }}
        replace
      />
    );
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
      { path: ROUTE_PATH.USER.STUDY_SET.LEARN_REVIEW.PATH, element: <LearnReview /> },
      { path: ROUTE_PATH.USER.TEST.CREATE, element: <CreateTest /> },
      { path: ROUTE_PATH.USER.TEST.EDIT.PATH, element: <EditTest /> },
      { path: ROUTE_PATH.USER.TEST.OVERVIEW.PATH, element: <TestOverview /> },
      { path: ROUTE_PATH.USER.TEST.TAKE.PATH, element: <TestTaking /> },
      { path: ROUTE_PATH.USER.TEST.RESULT.PATH, element: <TestResult /> },
      { path: ROUTE_PATH.USER.TEST.STATS.PATH, element: <TestStats /> },
      {
        path: ROUTE_PATH.USER.BATTLE.MATCHMAKING,
        element: <VocabBattleMatchmaking />,
      },
      {
        path: ROUTE_PATH.USER.BATTLE.ROOM.PATH,
        element: <VocabBattleRoom />,
      },
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
    children: [
      { path: ROUTE_PATH.ADMIN.DASHBOARD, element: <Dashboard /> },
      { path: ROUTE_PATH.ADMIN.USERS.LIST, element: <UserList /> },
      { path: ROUTE_PATH.ADMIN.USERS.DETAILS.PATH, element: <UserDetails /> },
      { path: ROUTE_PATH.ADMIN.STUDY_SETS.LIST, element: <StudySetList /> },
      { path: ROUTE_PATH.ADMIN.STUDY_SETS.DETAILS.PATH, element: <StudySetDetails /> },
    ],
  },
];

export default PrivateRoutes;
