import { UserProcessType } from '@/types';

import { VocabTerm } from './studySet';
import { IUser } from './user';

export interface IUserProcess {
  id: string;
  status: UserProcessType;
  nextReview: UserProcessType;
  correctCount: number;
  wrongCount: number;
  lastStudiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserProcessExtended extends IUserProcess {
  user: IUser;
  item: VocabTerm;
}
