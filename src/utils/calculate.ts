type TimeUnit = 'second' | 'minute' | 'hour' | 'day';
export const calculateDuration = (start: string | Date, end: string | Date, unit: TimeUnit = 'minute'): number => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  // Hiệu số tính bằng miligiây
  const diffInMs = Math.abs(endTime - startTime);

  switch (unit) {
    case 'second':
      return parseFloat((diffInMs / 1000).toFixed(2));
    case 'minute':
      return parseFloat((diffInMs / (1000 * 60)).toFixed(2));
    case 'hour':
      return parseFloat((diffInMs / (1000 * 60 * 60)).toFixed(2));
    case 'day':
      return parseFloat((diffInMs / (1000 * 60 * 60 * 24)).toFixed(2));
    default:
      return diffInMs;
  }
};
