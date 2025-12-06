# Kairos DatePicker

**A standalone, high-performance, aesthetically premium Date Range Picker component for React/Next.js applications.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-19-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.5-blue)

## 🚀 Overview

Existing libraries often struggle with precise styling customization and alignment issues. **Kairos DatePicker** is built from scratch to provide 100% control over the DOM structure, ensuring pixel-perfect alignment and smooth interactions.

## ✨ Features

- **Dual Month View:** Perfect for range selection context.
- **Smart Presets:** Quick selection for "Last 7 Days", "Last Month", etc.
- **Pixel-Perfect Alignment:** Uses CSS Grid to ensure weekday headers align perfectly with day columns.
- **Premium UX:** Smooth hover effects, rounded highlights, and intuitive range visualization.
- **Headless Logic:** Separated hooks (`useCalendarMatrix`) for maximum flexibility.
- **Compatible:** Built for Next.js 15+ Server Components architecture (works as a Client Component).

## 🛠 Tech Stack

- **Framework:** React 19 / Next.js
- **Styling:** Tailwind CSS v3
- **Icons:** Lucide React
- **Logic:** date-fns

## 📦 Installation

*(Coming Soon)*

```bash
npm install kairos-date-picker
```

## 📖 Usage

```tsx
import { DatePicker } from '@/components/kairos-date-picker';
import { useState } from 'react';
import { DateRange } from '@/types/date-picker';

export default function Page() {
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <div className="p-10">
      <DatePicker 
        value={date} 
        onChange={setDate} 
      />
    </div>
  );
}
```

## 🗺 Roadmap

- [x] Core Grid Logic Implementation (`useCalendarMatrix`)
- [x] Visual Component Construction
- [x] Sidebar & Presets Integration
- [x] Accessibility (ARIA Roles & Labels)
- [ ] Keyboard Navigation
- [ ] Npm Package Publication

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
