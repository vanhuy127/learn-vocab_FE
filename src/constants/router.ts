export const ROUTE_PATH = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  USER: {
    ACCOUNT: '/account',
    HOME: '/',
    SEARCH: '/search',
    LIBRARY: '/library',
    STUDY_SET: {
      CREATE: '/study-set/create',
      EDIT: {
        PATH: '/study-set/:id/edit',
        LINK: (id: string) => `/study-set/${id}/edit`,
      },
      DETAILS: {
        PATH: '/study-set/:id',
        LINK: (id: string) => `/study-set/${id}`,
      },
    },
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
  },
  NOT_FOUND: '*',
  UNAUTHORIZE: '/unauthorized',
};
