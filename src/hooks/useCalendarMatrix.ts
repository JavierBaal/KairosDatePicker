import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isToday,
    isWeekend
} from 'date-fns';
import { DayMatrixInfo } from '@/types/date-picker';

/**
 * Hook to generate a calendar matrix for a specific month.
 * It includes padding days from the previous month and the next month
 * to ensure a complete week grid (usually 7x5 or 7x6).
 */
export function useCalendarMatrix(month: Date): DayMatrixInfo[] {
    // 1. Find the first and last day of the visible month
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);

    // 2. Expand to find the start of the first week and end of the last week
    // ensuring the grid starts on Sunday/Monday depending on locale (default date-fns is Sunday)
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    // 3. Generate all days in between
    const days = eachDayOfInterval({
        start: calendarStart,
        end: calendarEnd
    });

    // 4. Map to DayMatrixInfo shape
    return days.map((date) => ({
        date,
        isCurrentMonth: isSameMonth(date, monthStart),
        isToday: isToday(date),
        isWeekend: isWeekend(date)
    }));
}
