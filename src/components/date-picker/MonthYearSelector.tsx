
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MonthYearSelectorProps {
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const years = Array.from({ length: 20 }, (_, i) => 2020 + i);

export const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({
  currentMonth,
  currentYear,
  onMonthChange,
  onYearChange,
  onPrevMonth,
  onNextMonth
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevMonth}
          className="h-8 w-8 text-[#8E9196] hover:text-[#9b87f5] hover:bg-transparent"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Select value={currentMonth.toString()} onValueChange={(v) => onMonthChange(parseInt(v))}>
          <SelectTrigger className="w-[80px] border-0 text-[#222222] hover:text-[#9b87f5] focus:ring-0">
            <SelectValue>{months[currentMonth - 1]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem 
                key={index + 1} 
                value={(index + 1).toString()}
                className="hover:text-[#9b87f5]"
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNextMonth}
          className="h-8 w-8 text-[#8E9196] hover:text-[#9b87f5] hover:bg-transparent"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <Select value={currentYear.toString()} onValueChange={(v) => onYearChange(parseInt(v))}>
        <SelectTrigger className="w-[80px] border-0 text-[#222222] hover:text-[#9b87f5] focus:ring-0">
          <SelectValue>{currentYear}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem 
              key={year} 
              value={year.toString()}
              className="hover:text-[#9b87f5]"
            >
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
