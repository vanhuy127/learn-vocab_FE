import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_BASE_URL: z.string(),
});

const envValues = envSchema.safeParse(import.meta.env);

if (!envValues.success) {
  throw new Error('Chưa thiết lập biến môi trường đầy đủ');
}

const envConfig = envValues.data;
export { envConfig };
