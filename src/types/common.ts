import type { ACCESS_LEVEL, ROLE } from '@/constants';

export type Role = (typeof ROLE)[keyof typeof ROLE];

export type AccessLevel = (typeof ACCESS_LEVEL)[keyof typeof ACCESS_LEVEL];

export type MyLibraryTabType = 'study-set' | 'folder' | 'test';

export type UserProcessType = 'NEW' | 'LEARNING' | 'MASTERED';

export type QuestionType = 'CHOICE' | 'FILL_IN' | 'T_F' | 'MULTI_CHOICE';
