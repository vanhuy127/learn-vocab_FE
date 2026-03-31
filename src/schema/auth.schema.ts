import z from 'zod';

import { PASSWORD_REGEX } from '@/constants';

export const passwordSchema = z
  .string()
  .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
  .max(25, 'Mật khẩu phải có tối đa 25 ký tự')
  .regex(PASSWORD_REGEX, 'Mật khẩu phải chứa ít nhất một ký tự in hoa, in thường, số và ký tự đặc biệt');
