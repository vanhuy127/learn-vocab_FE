import z from 'zod';

export const skillSchema = z.object({
  name: z.string().min(1, 'Tên kỹ năng không được để trống'),
});

export type SkillFormValues = z.infer<typeof skillSchema>;
