import { AccessLevel } from '@/types';

export interface IStudySet {
  id: string;
  name: string;
  description?: string;
  language: string;
  accessLevel: AccessLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStudySetSearch extends IStudySet {
  _count: {
    items: number;
  };
}
