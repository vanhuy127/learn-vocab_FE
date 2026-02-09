import { CreateTestFormValues } from '@/schema/test.schema';

export type CreateTestPayload = {
  title: string;
  description?: string;
  duration?: number;
  accessLevel: CreateTestFormValues['accessLevel'];
  questions: Array<{
    questionType: CreateTestFormValues['questions'][number]['questionType'];
    questionText: string;
    position?: number;
    points?: number;
    options?: Array<{
      label: string;
      text: string;
      isCorrect?: boolean;
      position?: number;
    }>;
    fillAnswers?: string[];
  }>;
};
