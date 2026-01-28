import { formatDate, calculateEndDate, getDurationString } from './dateUtils';

describe('Date Utilities', () => {
  test('formatDate formats date correctly', () => {
    expect(formatDate('2026-01-28')).toBe('28 Jan 2026');
  });

  test('calculateEndDate calculates correctly', () => {
    expect(calculateEndDate('2026-01-28', 3)).toBe('30 Jan 2026');
  });

  test('getDurationString formats correctly', () => {
    expect(getDurationString(1)).toBe('1 day');
    expect(getDurationString(3)).toBe('3 days');
  });
});