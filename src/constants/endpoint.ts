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
