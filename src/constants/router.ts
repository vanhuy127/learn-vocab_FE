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
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
  },
  NOT_FOUND: '*',
  UNAUTHORIZE: '/unauthorized',
  FORBIDDEN: '/forbidden',
};
