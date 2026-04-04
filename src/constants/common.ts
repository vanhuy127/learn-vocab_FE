import { Globe, Link, Lock, LucideIcon } from 'lucide-react';

import { AccessLevel, QuestionType } from '@/types';

export const LOCAL_STORAGE_KEY = {
  LANGUAGE: 'language',
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
} as const;

export const ACCESS_LEVEL_ARRAY = Object.values(ACCESS_LEVEL);

export const ACCESS_LEVEL_SHOWS: Record<AccessLevel, { icon: LucideIcon; value: string }> = {
  [ACCESS_LEVEL.PUBLIC]: { icon: Globe, value: 'Công khai' },
  [ACCESS_LEVEL.ACCESS_BY_LINK]: { icon: Link, value: 'Truy cập bằng liên kết' },
  [ACCESS_LEVEL.PRIVATE]: { icon: Lock, value: 'Riêng tư' },
};

export const QUESTION_TYPE = {
  CHOICE: 'CHOICE',
  FILL_IN: 'FILL_IN',
  T_F: 'T_F',
  MULTI_CHOICE: 'MULTI_CHOICE',
} as const;

export const QUESTION_TYPE_ARRAY = Object.values(QUESTION_TYPE);

export const QUESTION_TYPE_SHOWS: Record<QuestionType, string> = {
  [QUESTION_TYPE.CHOICE]: 'Trắc nghiệm (1 đáp án)',
  [QUESTION_TYPE.FILL_IN]: 'Điền vào chỗ trống',
  [QUESTION_TYPE.T_F]: 'Đúng / Sai',
  [QUESTION_TYPE.MULTI_CHOICE]: 'Trắc nghiệm (Nhiều đáp án)',
};
