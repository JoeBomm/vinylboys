import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import objectSupport from 'dayjs/plugin/objectSupport'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'

dayjs.extend(customParseFormat);
dayjs.extend(objectSupport);
dayjs.extend(utc);
dayjs.extend(duration)

export default dayjs;

// Accepts string time in HH:mm form, returns seconds since midnight
export function HHmmToSecondsSinceMidnight(timeHHmm: string): number {
  // string time to dayjs object
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_MINUTE = 60;
  const formattedTime = dayjs(timeHHmm, 'HH:mm').utc()
  
  return formattedTime.hour()*SECONDS_IN_HOUR + formattedTime.minute()*SECONDS_IN_MINUTE
}

// Accepts int dayOfWeek, int numberOfWeeks, ? time (seconds or HH:mm?)
// returns the next utc dateTime that lands on the day of week at the time,
// with at least the numberOfWeeks after now
// if now is monday, number of weeks is 1, return will be time next monday
// if now is now is tuesday, number of weeks is 1, return will be 2 mondays
/*
   Now: M, target S -> Next M + 1 week
   Now: M, target M -> next M
   Now: M, target T -> next T
   Sat = 7
   Now: sat, target sun -> 
 */
/**
 * 
 * @param dayOfWeek day of week returned date is on, 0 index starting sunday
 * @param numberOfWeeks number of weeks in the future, if 0 passed, 1 will be used
 * @param secondsFromMidnightUTC seconds from midnight in UTC to set the returned dateTime to
 * @returns The UTC date for the next input week day + numberOfWeeks weeks
 */
export function getNextUtcDateForDay(
  dayOfWeek: number, 
  numberOfWeeks: number, 
  secondsFromMidnightUTC: number): string {
    
    const dayOfWeekNow = dayjs().day()
    const dayDiff = dayOfWeek - dayOfWeekNow

    return dayjs().utc()
      .add(dayDiff, 'd')
      .add(Math.max(numberOfWeeks, 1), 'w') // don't allow 0 weeks

      .startOf('day')
      .add(secondsFromMidnightUTC, 's')
      .format();  
}