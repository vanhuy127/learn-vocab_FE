import { AccessLevel } from '@/types';

import { ILanguage } from './language';

export interface IStudySet {
  id: string;
  name: string;
  description?: string;
  language: ILanguage;
  accessLevel: AccessLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStudySetSearch extends IStudySet {
  _count: {
    items: number;
  };
}

export interface VocabTerm {
  id: string;
  term: string;
  definition: string;
  note?: string;
}

export interface IStudySetExtended extends IStudySet {
  terms: VocabTerm[];
}
