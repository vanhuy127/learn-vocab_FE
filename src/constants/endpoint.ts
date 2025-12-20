//endpoint api
export const END_POINT = {
  AUTH: {
    ME: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGIN: '/auth/login',
  },
  USER: {
    SEARCH: '/search',
    STUDY_SET: {
      CURRENT_LIST: '/study-set/current-user',
    },
    FOLDER: {
      CURRENT_LIST: '/folder/current-user',
    },
    TEST: {
      CURRENT_LIST: '/test/current-user',
    },
  },
  ADMIN: {},
};
