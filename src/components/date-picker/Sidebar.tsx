"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { subDays, subMonths, startOfMonth, startOfYear, startOfWeek, endOfWeek } from "date-fns";
import { DateRange } from "@/types/date-picker";

interface SidebarProps {
    onSelectRange: (range: DateRange) => void;
    className?: string;
}

export function Sidebar({ onSelectRange, className }: SidebarProps) {
    const today = new Date();

    const presets = [
        {
            label: "Today",
            getValue: () => ({ from: today, to: today }),
        },
        {
            label: "Yesterday",
            getValue: () => {
                const y = subDays(today, 1);
                return { from: y, to: y };
            },
        },
        {
            label: "Last 7 Days",
            getValue: () => ({ from: subDays(today, 6), to: today }),
        },
        {
            label: "Last 30 Days",
            getValue: () => ({ from: subDays(today, 29), to: today }),
        },
        {
            label: "This Month",
            getValue: () => ({ from: startOfMonth(today), to: today }),
        },
        {
            label: "Last Month",
            getValue: () => {
                const lastMonth = subMonths(today, 1);
                return {
                    from: startOfMonth(lastMonth),
                    to: new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0) // End of last month
                };
            },
        },
        {
            label: "This Year",
            getValue: () => ({ from: startOfYear(today), to: today }),
        }
    ];

    return (
        <div className={cn("flex flex-col gap-2 p-3 border-r border-border bg-muted/20 w-40", className)}>
            <div className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">
                Presets
            </div>
            {presets.map((preset) => (
                <button
                    key={preset.label}
                    onClick={() => onSelectRange(preset.getValue())}
                    className="text-left text-sm px-3 py-2 rounded-md hover:bg-muted text-foreground transition-colors hover:text-primary"
                >
                    {preset.label}
                </button>
            ))}
        </div>
    );
}
