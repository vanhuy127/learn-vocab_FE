import { AccessLevel } from '@/types';

import { IFolder } from './folder';
import { ILanguage } from './language';
import { IUserProcess } from './userProcess';

export interface IStudySet {
  id: string;
  name: string;
  description?: string;
  language: ILanguage;
  accessLevel: AccessLevel;
  folder?: IFolder;
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
  word: string;
  meaning: string;
  note?: string;
  position: number;
  progress: IUserProcess[] | [];
}

export interface IStudySetExtended extends IStudySet {
  items: VocabTerm[];
}
