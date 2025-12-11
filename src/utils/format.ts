import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import { DATE_PATTERN, DEFAULT_TIME_ZONE } from '@/constants';

export function formatDate(
  date: string | Date,
  pattern: string = DATE_PATTERN.DATE_TIME,
  timeZone: string = DEFAULT_TIME_ZONE,
): string {
  const zonedDate = toZonedTime(date, timeZone);

  return format(zonedDate, pattern);
}

export function parseDateFromString(dateStr: string): Date | undefined {
  const [day, month, year] = dateStr.split('-').map(Number);
  if (!day || !month || !year) return undefined;

  return new Date(year, month - 1, day);
}
