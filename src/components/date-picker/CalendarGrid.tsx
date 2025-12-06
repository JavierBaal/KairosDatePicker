"use client";

import * as React from "react";
import { format, isToday, isSameMonth, isWithinInterval, isSameDay } from "date-fns";
import { useCalendarMatrix } from "@/hooks/useCalendarMatrix";
import { DayMatrixInfo } from "@/types/date-picker";
import { cn } from "@/lib/utils";
import { DateRange } from "@/types/date-picker";

interface CalendarGridProps {
    month: Date;
    dateRange: DateRange | undefined;
    hoverDate: Date | undefined;
    onDateClick: (date: Date) => void;
    onDateHover: (date: Date | undefined) => void;
}

export function CalendarGrid({
    month,
    dateRange,
    hoverDate,
    onDateClick,
    onDateHover
}: CalendarGridProps) {
    const matrix = useCalendarMatrix(month);
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const isSelected = (date: Date) => {
        if (!dateRange) return false;
        if (dateRange.from && isSameDay(date, dateRange.from)) return true;
        if (dateRange.to && isSameDay(date, dateRange.to)) return true;
        return false;
    };

    const isInRange = (date: Date) => {
        // 1. Fully selected range
        if (dateRange?.from && dateRange?.to) {
            return isWithinInterval(date, { start: dateRange.from, end: dateRange.to });
        }
        // 2. Preview range (From -> Hover)
        if (dateRange?.from && !dateRange.to && hoverDate) {
            const start = dateRange.from < hoverDate ? dateRange.from : hoverDate;
            const end = dateRange.from < hoverDate ? hoverDate : dateRange.from;
            return isWithinInterval(date, { start, end });
        }
        return false;
    };

    const isRangeStart = (date: Date) => {
        if (dateRange?.from && isSameDay(date, dateRange.from)) return true;
        // Handle reverse hover
        if (dateRange?.from && !dateRange.to && hoverDate && hoverDate < dateRange.from) {
            return isSameDay(date, hoverDate);
        }
        return false;
    }

    const isRangeEnd = (date: Date) => {
        if (dateRange?.to && isSameDay(date, dateRange.to)) return true;
        // Handle forward hover
        if (dateRange?.from && !dateRange.to && hoverDate && hoverDate > dateRange.from) {
            return isSameDay(date, hoverDate);
        }
        return false;
    }

    return (
        <div className="p-4">
            <div className="text-center font-medium mb-4 text-sm text-foreground">
                {format(month, 'MMMM yyyy')}
            </div>

            <div className="grid grid-cols-7 mb-2">
                {weekDays.map(d => (
                    <div key={d} className="text-center text-xs text-muted-foreground font-medium py-1">
                        {d}
                    </div>
                ))}
            </div>

            <div
                className="grid grid-cols-7 gap-y-1 relative"
                onMouseLeave={() => onDateHover(undefined)}
                role="grid"
                aria-label={`Calendar for ${format(month, 'MMMM yyyy')}`}
            >
                {matrix.map((day, i) => {
                    const selected = isSelected(day.date);
                    const inRange = isInRange(day.date);
                    const rangeStart = isRangeStart(day.date);
                    const rangeEnd = isRangeEnd(day.date);

                    return (
                        <button
                            key={i}
                            onClick={() => onDateClick(day.date)}
                            onMouseEnter={() => onDateHover(day.date)}
                            // Accessibility Attributes
                            role="gridcell"
                            aria-selected={selected}
                            tabIndex={day.isCurrentMonth && day.isToday ? 0 : -1} // Roving tabindex logic to be fully implemented
                            aria-label={format(day.date, 'EEEE, MMMM do, yyyy')}
                            className={cn(
                                "relative aspect-square flex items-center justify-center text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:z-20 rounded-md",

                                // Base colors
                                !day.isCurrentMonth && "text-muted-foreground opacity-50",
                                day.isCurrentMonth && "text-foreground",

                                // Hover effect (only if not selected)
                                !selected && day.isCurrentMonth && "hover:bg-muted font-medium hover:text-primary",

                                // Range Background Styling
                                inRange && !selected && "bg-accent text-accent-foreground rounded-none",
                                inRange && rangeStart && "rounded-l-md",
                                inRange && rangeEnd && "rounded-r-md",

                                // Selected State (Solid Primary)
                                selected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground z-10 font-semibold shadow-sm",

                                // Today Indicator (if not selected)
                                !selected && !inRange && day.isToday && "bg-muted text-foreground font-bold border border-border"
                            )}
                        >
                            <time dateTime={format(day.date, 'yyyy-MM-dd')}>
                                {format(day.date, 'd')}
                            </time>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
