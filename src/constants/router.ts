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
    BATTLE: {
      MATCHMAKING: '/battle',
      ROOM: {
        PATH: '/battle/:id',
        LINK: (id: string) => `/battle/${id}`,
      },
    },
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
      LEARN_FLASHCARD: {
        PATH: '/study-set/:id/flashcard',
        LINK: (id: string) => `/study-set/${id}/flashcard`,
      },
      LEARN_QUIZ: {
        PATH: '/study-set/:id/quiz',
        LINK: (id: string) => `/study-set/${id}/quiz`,
      },
      LEARN_REVIEW: {
        PATH: '/study-set/:id/review',
        LINK: (id: string) => `/study-set/${id}/review`,
      },
    },
    TEST: {
      CREATE: '/test/create',
      EDIT: {
        PATH: '/test/:id/edit',
        LINK: (id: string) => `/test/${id}/edit`,
      },
      OVERVIEW: {
        PATH: '/test/:id',
        LINK: (id: string) => `/test/${id}`,
      },
      TAKE: {
        PATH: '/test/:id/take/:attemptId',
        LINK: (id: string, attemptId: string) => `/test/${id}/take/${attemptId}`,
      },
      RESULT: {
        PATH: '/test/:id/result/:attemptId',
        LINK: (id: string, attemptId: string) => `/test/${id}/result/${attemptId}`,
      },
      STATS: {
        PATH: '/test/:id/stats',
        LINK: (id: string) => `/test/${id}/stats`,
      },
    },
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: {
      LIST: '/admin/users',
      DETAILS: {
        PATH: '/admin/users/:id',
        LINK: (id: string) => `/admin/users/${id}`,
      },
    },
    STUDY_SETS: {
      LIST: '/admin/study-sets',
      DETAILS: {
        PATH: '/admin/study-sets/:id',
        LINK: (id: string) => `/admin/study-sets/${id}`,
      },
    },
  },
  NOT_FOUND: '*',
  UNAUTHORIZE: '/unauthorized',
  FORBIDDEN: '/forbidden',
};
