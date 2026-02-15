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
      SUBMIT_MANY_ANSWER: (id: string) => `/study-item/${id}/many-answer`,
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
      CREATE: '/test',
      GET_BY_ID: (id: string) => `/test/${id}`,
      GET_USER_BY_ID: (id: string) => `/user/test/${id}`,
      EDIT: (id: string) => `/test/${id}`,
      DELETE: (id: string) => `/test/${id}`,
      OVERVIEW: (id: string) => `/test/${id}/overview`,
      START: (id: string) => `/test/${id}/start`,
      ATTEMPT: (attemptId: string) => `/test/attempt/${attemptId}`,
      SUBMIT: (attemptId: string) => `/test/attempt/${attemptId}/submit`,
      RESULT: (attemptId: string) => `/test/attempt/${attemptId}/result`,
      STATS: (id: string) => `/test/${id}/stats`,
      HISTORY: (id: string) => `/test/${id}/history`,
    },
  },
  ADMIN: {},
};
