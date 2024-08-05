export default function isOneDayPassed(date1: Date, date2: Date): boolean {
  const startDate = date1 < date2 ? date1 : date2;
  const endDate = date1 < date2 ? date2 : date1;

  const diffInMs = endDate.getTime() - startDate.getTime();

  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays >= 1;
}
