"use client";

import React, { useState, useEffect } from "react";
import { DateRange } from "@/types/date-picker";
import { useDateRange } from "@/hooks/useDateRange";
import { CalendarGrid } from "./CalendarGrid";
import { Sidebar } from "./Sidebar";
import { addMonths, subMonths } from "date-fns";
import { MoveLeft, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
    value?: DateRange;
    onChange?: (range: DateRange | undefined) => void;
    className?: string;
    showPresets?: boolean;
}

export function DatePicker({ value, onChange, className, showPresets = true }: DatePickerProps) {
    const {
        range,
        setRange,
        hoverDate,
        setHoverDate,
        handleDateClick
    } = useDateRange({
        initialValue: value,
        onRangeChange: onChange
    });

    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Sync internal state if prop changes
    useEffect(() => {
        if (value) {
            setRange(value);
            // Optional: Jump to the start date of the range?
            // if (value.from) setCurrentMonth(value.from);
        }
    }, [value, setRange]);

    const handlePrev = () => setCurrentMonth(prev => subMonths(prev, 1));
    const handleNext = () => setCurrentMonth(prev => addMonths(prev, 1));

    const handlePresetSelect = (newRange: DateRange) => {
        setRange(newRange);
        onChange?.(newRange);
        if (newRange.from) {
            setCurrentMonth(newRange.from); // Jump to selection
        }
    };

    return (
        <div className={cn("inline-flex bg-background border border-border shadow-lg rounded-xl overflow-hidden", className)}>

            {showPresets && (
                <Sidebar onSelectRange={handlePresetSelect} />
            )}

            <div className="flex flex-col">
                {/* Header Controls */}
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <button
                        onClick={handlePrev}
                        className="h-7 w-7 bg-transparent hover:bg-muted flex items-center justify-center rounded-full text-muted-foreground transition-colors"
                    >
                        <MoveLeft className="h-4 w-4" />
                    </button>

                    <div className="text-sm font-semibold text-muted-foreground opacity-0">Spacer</div> {/* Invisible spacer for alignment logic if needed */}

                    <button
                        onClick={handleNext}
                        className="h-7 w-7 bg-transparent hover:bg-muted flex items-center justify-center rounded-full text-muted-foreground transition-colors"
                    >
                        <MoveRight className="h-4 w-4" />
                    </button>
                </div>

                {/* Dual Calendar View */}
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
                    <CalendarGrid
                        month={currentMonth}
                        dateRange={range}
                        hoverDate={hoverDate}
                        onDateClick={handleDateClick}
                        onDateHover={setHoverDate}
                    />
                    <CalendarGrid
                        month={addMonths(currentMonth, 1)}
                        dateRange={range}
                        hoverDate={hoverDate}
                        onDateClick={handleDateClick}
                        onDateHover={setHoverDate}
                    />
                </div>

                {/* Footer info (optional - e.g. Reset button) */}
                <div className="p-3 border-t border-border flex justify-end gap-2 bg-muted/10">
                    <button
                        onClick={() => handleDateClick(new Date())} // Hacky reset for now, better explicit reset
                        className="text-xs font-medium text-muted-foreground hover:text-primary px-3 py-1 rounded hover:bg-muted transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
