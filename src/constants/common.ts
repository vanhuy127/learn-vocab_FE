import { Globe, Link, Lock } from 'lucide-react';

export const LOCAL_STORAGE_KEY = {
  LANGUAGE: 'language',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  THEME: 'theme',
};

export const SYSTEM_ERROR = {
  SERVER_ERROR: {
    STATUS: 'Server Error',
    MESSAGE: 'Unable to connect to the server. Please try again later.',
  },

  NETWORK_ERROR: {
    STATUS: 'Network Error',
    MESSAGE: 'Request has been cancelled',
  },

  TIMEOUT_ERROR: {
    STATUS: 'Request Timeout',
    MESSAGE: 'The request has timed out',
  },
};

export const MAX_PAGE_SIZE = 10000000;
export const MAX_PAGE_SHOW = 7;
export const DEFAULT_TIME_ZONE = 'Asia/Bangkok';
export const ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export const ACCESS_LEVEL = {
  PUBLIC: 'PUBLIC',
  ACCESS_BY_LINK: 'ACCESS_BY_LINK',
  PRIVATE: 'PRIVATE',
};

export const ACCESS_LEVEL_ARRAY = Object.values(ACCESS_LEVEL);

export const ACCESS_LEVEL_SHOWS = {
  [ACCESS_LEVEL.PUBLIC]: { icon: Globe, value: 'Công khai' },
  [ACCESS_LEVEL.ACCESS_BY_LINK]: { icon: Link, value: 'Truy cập bằng liên kết' },
  [ACCESS_LEVEL.PRIVATE]: { icon: Lock, value: 'Riêng tư' },
};
