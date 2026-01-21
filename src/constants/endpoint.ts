//endpoint api
export const END_POINT = {
  AUTH: {
    ME: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGIN: '/auth/login',
  },
  SHARED: {
    LANGUAGE: {
      GET_ALL: '/language',
    },
  },
  USER: {
    SEARCH: '/search',
    STUDY_SET: {
      CURRENT_LIST: '/study-set/current-user',
      CREATE: '/study-set',
      GET_BY_ID: (id: string) => `/study-set/${id}`,
      GET_BY_ID_FOR_QUIZ: (id: string) => `/study-set/${id}/quiz`,
      EDIT: (id: string) => `/study-set/${id}`,
      DELETE: (id: string) => `/study-set/${id}`,
    },
    STUDY_ITEM: {
      SUBMIT: (id: string) => `/study-item/${id}/answer`,
    },
    FOLDER: {
      CURRENT_LIST: '/folder/current-user',
      CREATE: '/folder',
      GET_BY_ID: (id: string) => `/folder/${id}`,
      EDIT: (id: string) => `/folder/${id}`,
      DELETE: (id: string) => `/folder/${id}`,
    },
    TEST: {
      CURRENT_LIST: '/test/current-user',
    },
  },
  ADMIN: {},
};
