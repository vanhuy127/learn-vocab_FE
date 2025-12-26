import { z } from 'zod';

import { ACCESS_LEVEL_ARRAY } from '@/constants';

export const vocabTermSchema = z.object({
  id: z.string(),
  term: z.string().trim().min(1, 'Từ vựng không được để trống'),
  definition: z.string().trim().min(1, 'Định nghĩa không được để trống'),
  note: z.string().trim().max(255, 'Ghi chú tối đa 255 ký tự').optional().or(z.literal('')),
});

export const createStudySetSchema = z.object({
  title: z.string().trim().min(1, 'Tên học phần không được để trống').min(3, 'Tên học phần tối thiểu 3 ký tự'),
  description: z.string().trim().max(255, 'Mô tả tối đa 255 ký tự').optional().or(z.literal('')),
  accessLevel: z.enum([...ACCESS_LEVEL_ARRAY] as [string, ...string[]], {
    errorMap: () => ({ message: 'Loại công việc không hợp lệ' }),
  }),
  language: z.string().min(1, 'Vui lòng chọn ngôn ngữ'),
  folderId: z.string().optional(),
  terms: z.array(vocabTermSchema).min(2, 'Cần tối thiểu 2 từ vựng'),
});

export type CreateStudySetFormValues = z.infer<typeof createStudySetSchema>;
