import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { Button } from '@/components/ui/button';
import { MonthYearSelector } from './MonthYearSelector';
import { CalendarGrid } from './CalendarGrid';

interface DatePickerProps {
  onSelect?: (date: Date | null) => void;
  onClose?: () => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ onSelect, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleMonthChange = (month: number) => {
    const newDate = new Date(currentDate.setMonth(month - 1));
    setCurrentDate(newDate);
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(currentDate.setFullYear(year));
    setCurrentDate(newDate);
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClear = () => {
    setSelectedDate(null);
    onSelect?.(null);
  };

  const handleConfirm = () => {
    onSelect?.(selectedDate);
    onClose?.();
  };

  return (
    <div className="p-4 bg-background border rounded-lg shadow-lg w-[350px]">
      <MonthYearSelector
        currentMonth={currentDate.getMonth() + 1}
        currentYear={currentDate.getFullYear()}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <CalendarGrid
        currentDate={currentDate}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleClear}
          className="text-muted-foreground"
        >
          清除
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleConfirm}>
            確認
          </Button>
        </div>
      </div>
    </div>
  );
};