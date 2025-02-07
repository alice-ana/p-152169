
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
    <div className="p-4 bg-[#F3EDF7] border-0 rounded-3xl shadow-lg w-[350px]">
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
          className="text-[#9b87f5] hover:text-[#9b87f5] hover:bg-transparent"
        >
          Clear
        </Button>
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="text-[#9b87f5] hover:text-[#9b87f5] hover:bg-transparent"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            className="text-[#9b87f5] hover:text-[#9b87f5] hover:bg-transparent"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};
