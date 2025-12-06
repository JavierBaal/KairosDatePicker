import { useState, useCallback } from 'react';
import { DateRange } from '@/types/date-picker';
import { isBefore, isAfter, isSameDay } from 'date-fns';

interface UseDateRangeProps {
    initialValue?: DateRange;
    onRangeChange?: (range: DateRange | undefined) => void;
    minDate?: Date;
    maxDate?: Date;
}

export function useDateRange({
    initialValue,
    onRangeChange,
    minDate,
    maxDate
}: UseDateRangeProps = {}) {
    const [range, setRange] = useState<DateRange | undefined>(initialValue);
    const [hoverDate, setHoverDate] = useState<Date | undefined>();

    // Helper to check validity
    const isValidDate = useCallback((date: Date) => {
        if (minDate && isBefore(date, minDate) && !isSameDay(date, minDate)) return false;
        if (maxDate && isAfter(date, maxDate) && !isSameDay(date, maxDate)) return false;
        return true;
    }, [minDate, maxDate]);

    const handleDateClick = useCallback((date: Date) => {
        if (!isValidDate(date)) return;

        setRange((prev) => {
            // Case 1: New selection or Reset (Start from scratch)
            if (!prev || (prev.from && prev.to)) {
                const newRange = { from: date, to: undefined };
                onRangeChange?.(newRange);
                return newRange;
            }

            // Case 2: Completing a range (Has 'from', missing 'to')
            if (prev.from && !prev.to) {
                // If clicked before the 'from' date, swap them or reset start
                if (isBefore(date, prev.from)) {
                    const newRange = { from: date, to: prev.from }; // Auto-swap logic
                    onRangeChange?.(newRange);
                    return newRange;
                }

                // Standard range completion
                const newRange = { from: prev.from, to: date };
                onRangeChange?.(newRange);
                return newRange;
            }

            return prev;
        });
    }, [isValidDate, onRangeChange]);

    const handleValidation = (date: Date) => isValidDate(date);

    return {
        range,
        setRange,
        hoverDate,
        setHoverDate,
        handleDateClick,
        isValidDate: handleValidation
    };
}
