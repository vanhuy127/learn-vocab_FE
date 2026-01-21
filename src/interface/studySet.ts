import { AccessLevel } from '@/types';

import { IFolder } from './folder';
import { ILanguage } from './language';
import { IUserProcess } from './userProcess';

export interface IStudySet {
  id: string;
  userId: string;
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
export interface QuizTermOptions {
  id: string;
  text: string;
}

export interface QuizTerm {
  itemId: string;
  questionType: 'CHOICE';
  question: string;
  options: QuizTermOptions[];
  correctAnswer: string;
}

export interface IStudySetExtended extends IStudySet {
  items: VocabTerm[];
}

export interface IQuiz extends IStudySet {
  items: QuizTerm[];
}
