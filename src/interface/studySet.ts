import { AccessLevel } from '@/types';

import { IFolder } from './folder';
import { ILanguage } from './language';
import { IUser, IUserRes } from './user';
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

export interface IStudySetAdmin extends IStudySet {
  _count: {
    items: number;
  };
  user: IUser;
}

export interface VocabTerm {
  id: string;
  word: string;
  meaning: string;
  note?: string;
  position: number;
  progress: IUserProcess[] | [];
  isDeleted?: boolean;
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

export interface IAdminStudySet extends IStudySet {
  user: IUserRes;
  _count: {
    items: number;
  };
}

export interface IAdminStudySetDetail extends IStudySet {
  user: IUserRes;
  isDeleted: boolean;
  items: VocabTerm[];
}

export interface IAdminStudySetStatisticsResponse {
  overview: {
    totalItems: number;
    totalUsersStudied: number;
  };

  progress: {
    completionRate: number;
    statusDistribution: {
      NEW: number;
      LEARNING: number;
      MASTERED: number;
    };
  };

  performance: {
    accuracyRate: number | string;
    avgAttemptsPerUser: number;
  };

  review: {
    overdueItems: number;
  };

  content: {
    difficultWords: DifficultWord[];
  };
}

export interface DifficultWord {
  id: string;
  word: string;
  meaning: string;
  note: string | null;
  wrongCount: number;
  correctCount: number;
}
