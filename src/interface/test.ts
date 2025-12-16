import { AccessLevel } from '@/types';

import { IUser } from './user';

export interface ITest {
  id: string;
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
