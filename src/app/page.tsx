"use client";

import { useState } from "react";
import { DatePicker } from "@/components/date-picker/DatePicker";
import { DateRange } from "@/types/date-picker";
import { format } from "date-fns";

export default function DatePickerDemo() {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-8 font-sans">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Kairos DatePicker V1</h1>
        <p className="text-slate-500">Premium Range Selection Component</p>
      </div>

      <DatePicker
        value={range}
        onChange={setRange}
      />

      <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border border-slate-200 min-w-[300px] text-center">
        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Selected Range</div>
        <div className="font-mono text-slate-700 font-medium">
          {range?.from ? format(range.from, 'PPP') : 'Start Date'}
          <span className="mx-2 text-slate-300">→</span>
          {range?.to ? format(range.to, 'PPP') : 'End Date'}
        </div>
      </div>
    </div>
  );
}
