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
  isLocked: boolean;
}

export interface ITestSearch extends ITest {
  user: IUser;
  _count: {
    questions: number;
  };
}

export interface IAdminTest extends ITest {
  isDeleted: boolean;
  _count: {
    results: number;
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

export interface ITestOverview {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  totalQuestions: number;
  ownerId?: string;
}

export interface ITestAttemptQuestionOption {
  id: string;
  text: string;
}

export interface ITestAttemptQuestion {
  id: string;
  questionType: 'CHOICE' | 'MULTI_CHOICE' | 'T_F' | 'FILL_IN';
  questionText: string;
  options?: ITestAttemptQuestionOption[];
  points?: number;
}

export interface ITestAttempt {
  attemptId: string;
  testId: string;
  title: string;
  duration?: number;
  startedAt: string;
  remainingSeconds?: number;
  questions: ITestAttemptQuestion[];
}

export interface ITestSubmitAnswer {
  questionId: string;
  answer: string | string[];
}

export interface ITestResultQuestion {
  id: string;
  questionText: string;
  questionType: 'CHOICE' | 'MULTI_CHOICE' | 'T_F' | 'FILL_IN';
  isCorrect: boolean;
  userAnswer?: string | string[];
  correctAnswer?: string | string[];
}

export interface ITestResult {
  attemptId: string;
  testId: string;
  score: number;
  totalPoints: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  allowReview: boolean;
  questions?: ITestResultQuestion[];
}

export interface IAdminTestResult {
  id: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  startedAt: Date;
  finishedAt: Date;
  createdAt: Date;
  test: ITest;
}

export interface ITestStatsQuestion {
  id: string;
  questionText: string;
  correctRate: number;
  wrongRate: number;
  skippedRate: number;
}

export interface ITestStats {
  testId: string;
  totalAttempts: number;
  averageScore: number;
  highestScore: number;
  averageTimeSeconds: number;
  questions: ITestStatsQuestion[];
}

export interface ITestHistoryRow {
  attemptId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  startedAt: string;
  finishedAt: string;
  timeSpentSeconds: number;
}

export interface ITestHistory {
  testId: string;
  testTitle: string;
  totalAttempts: number;
  totalStudents: number;
  rows: ITestHistoryRow[];
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
