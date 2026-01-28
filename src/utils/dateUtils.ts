export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const calculateEndDate = (startDate: string, days: number): string => {
  const date = new Date(startDate);
  // Subtract 1 day because if you take 1 day off, start and end are the same
  date.setDate(date.getDate() + (days > 0 ? days - 1 : 0));
  return formatDate(date.toISOString());
};

export const getDurationString = (days: number): string => {
  return days === 1 ? '1 day' : `${days} days`;
};