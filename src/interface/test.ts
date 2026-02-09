import { AccessLevel } from '@/types';

import { IUser } from './user';

export interface ITest {
  id: string;
  userId?: string;
  title: string;
  description?: string;
  duration?: number;
  accessLevel: AccessLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITestSearch extends ITest {
  user: IUser;
  _count: {
    questions: number;
  };
}

export interface ITestOption {
  id?: string;
  label?: string;
  text: string;
  isCorrect?: boolean;
  position?: number;
}

export interface ITestQuestion {
  id: string;
  questionType: 'CHOICE' | 'MULTI_CHOICE' | 'T_F' | 'FILL_IN';
  questionText?: string;
  question?: string;
  points?: number;
  options?: ITestOption[];
  fillAnswers?: string[];
  position?: number;
}

export interface ITestExtended extends ITest {
  questions: ITestQuestion[];
}

export interface ITestQuestionResponse {
  id: string;
  questionType: 'CHOICE' | 'MULTI_CHOICE' | 'T_F' | 'FILL_IN';
  questionText?: string;
  question?: string;
  points?: number;
  options?: ITestOption[];
  fillAnswers?: {
    id: string;
    answerText: string;
  }[];
  position?: number;
}

export interface ITestResponse extends ITest {
  questions: ITestQuestionResponse[];
}
