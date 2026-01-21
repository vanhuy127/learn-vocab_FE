import { lazy } from 'react';

import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/router';
import { BlankLayout } from '@/layout/blank';
import { DefaultLayout } from '@/layout/default';
import Unauthorized from '@/pages/Unauthorized';

const Home = lazy(() => import('@/pages/user/Home'));
const Search = lazy(() => import('@/pages/user/Search'));
const LearnVocab = lazy(() => import('@/pages/user/LearnVocab'));

const GlobalRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      { path: ROUTE_PATH.USER.HOME, element: <Home /> },
      { path: ROUTE_PATH.USER.SEARCH, element: <Search /> },
      { path: ROUTE_PATH.USER.STUDY_SET.DETAILS.PATH, element: <LearnVocab /> },
    ],
  },
  {
    element: <BlankLayout />,
    children: [{ path: ROUTE_PATH.UNAUTHORIZE, element: <Unauthorized /> }],
  },
];

export default GlobalRoutes;
