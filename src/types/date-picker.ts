export interface DateRange {
    from: Date | undefined;
    to?: Date | undefined;
}

export interface DayMatrixInfo {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isWeekend: boolean;
}

export interface UseCalendarMatrixProps {
    month: Date;
}
