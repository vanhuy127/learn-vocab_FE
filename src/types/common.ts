import type { ROLE } from '@/constants';

export type Role = (typeof ROLE)[keyof typeof ROLE];

export type AccessLevel = 'PUBLIC' | 'PRIVATE' | 'ACCESS_BY_LINK';

export type MyLibraryTabType = 'study-set' | 'folder' | 'test';
