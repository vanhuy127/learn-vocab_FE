import z from 'zod';

import { ACCESS_LEVEL_ARRAY, QUESTION_TYPE_ARRAY } from '@/constants';

export const questionsSchema = z
  .object({
    id: z.string(),

    questionType: z.enum([...QUESTION_TYPE_ARRAY] as [string, ...string[]], {
      errorMap: () => ({ message: 'Loại câu hỏi không hợp lệ' }),
    }),

    questionText: z.string().min(1, 'Câu hỏi không được để trống'),

    points: z.number().min(1).default(1),

    answer: z.string().optional(),

    options: z
      .array(
        z.object({
          id: z.string(),
          text: z.string(),
          isCorrect: z.boolean(),
        }),
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    const { questionType, options, answer } = data;

    /* ---------- T/F ---------- */
    if (questionType === 'T_F') {
      if (!options || options.length !== 2) {
        ctx.addIssue({
          path: ['options'],
          message: 'Câu hỏi Đúng/Sai phải có 2 đáp án',
          code: z.ZodIssueCode.custom,
        });

        return;
      }

      const correctCount = options.filter((o) => o.isCorrect).length;

      if (correctCount !== 1) {
        ctx.addIssue({
          path: ['options'],
          message: 'Chỉ chọn đúng 1 đáp án',
          code: z.ZodIssueCode.custom,
        });
      }
    }

    /* ---------- CHOICE / MULTI_CHOICE ---------- */
    if (questionType === 'CHOICE' || questionType === 'MULTI_CHOICE') {
      if (!options || options.length === 0) {
        ctx.addIssue({
          path: ['options'],
          message: 'Phải có ít nhất một đáp án',
          code: z.ZodIssueCode.custom,
        });

        return;
      }

      options.forEach((opt, index) => {
        if (!opt.text || !opt.text.trim()) {
          ctx.addIssue({
            path: ['options', index, 'text'],
            message: 'Nội dung đáp án không được để trống',
            code: z.ZodIssueCode.custom,
          });
        }
      });

      const correctCount = options.filter((o) => o.isCorrect).length;

      if (correctCount < 1) {
        ctx.addIssue({
          path: ['options'],
          message: 'Phải chọn ít nhất một đáp án đúng',
          code: z.ZodIssueCode.custom,
        });
      }

      if (questionType === 'CHOICE' && correctCount > 1) {
        ctx.addIssue({
          path: ['options'],
          message: 'Chỉ được chọn 1 đáp án đúng',
          code: z.ZodIssueCode.custom,
        });
      }
    }

    /* ---------- FILL IN ---------- */
    if (questionType === 'FILL_IN') {
      if (!answer || !answer.trim()) {
        ctx.addIssue({
          path: ['answer'],
          message: 'Đáp án không được để trống',
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export const createTestSchema = z.object({
  title: z.string().trim().min(1, 'Tiêu đề không được để trống').min(3, 'Tiêu đề tối thiểu 3 ký tự'),
  description: z.string().optional(),
  duration: z.number().min(0, 'Thời gian phải lớn hơn hoặc bằng 0'),
  accessLevel: z.enum([...ACCESS_LEVEL_ARRAY] as [string, ...string[]], {
    errorMap: () => ({ message: 'Loại công việc không hợp lệ' }),
  }),
  questions: z.array(questionsSchema),
});

export type CreateTestFormValues = z.input<typeof createTestSchema>;
