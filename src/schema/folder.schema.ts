import z from 'zod';

export const folderSchema = z.object({
  name: z.string().min(3, 'Tên thư mục phải có ít nhất 3 ký tự'),
  description: z.string().optional(),
});

export type FolderFormValues = z.infer<typeof folderSchema>;
