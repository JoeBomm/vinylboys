import dayjs from 'dayjs';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'
import { getNextUtcDateForDay } from './dayjs';

dayjs.extend(utc);
dayjs.extend(timezone);

describe('getNextUtcDateForDay', () => {
  

  beforeEach(() => {
    // Freeze time for predictable results
    vi.useFakeTimers();
    vi.setSystemTime(dayjs('2025-10-15T12:00:00').toDate()); // Wednesday
  });

  it('returns next Monday for dayOfWeek = 1', () => {
    const result = getNextUtcDateForDay(1, 0, 43200); // Monday at 10:00 UTC
    const expected = dayjs('2025-10-20T12:00:00Z').utc().format(); // + 1 week
    expect(result).toBe(expected);
  });

  it('adds numberOfWeeks correctly', () => {
    const result = getNextUtcDateForDay(1, 2, 50400); // Monday + 2 weeks
    const expected = dayjs('2025-10-27T14:00:00Z').utc().format();
    expect(result).toBe(expected);
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
