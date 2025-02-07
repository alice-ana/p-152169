
import React from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isToday, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  selectedDate,
  onDateSelect,
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDay = monthStart.getDay();
  const prevMonthPadding = Array(startDay).fill(null);

  const endDay = monthEnd.getDay();
  const nextMonthPadding = Array(6 - endDay).fill(null);

  const allDays = [...prevMonthPadding, ...daysInMonth, ...nextMonthPadding];
  const weeks = [];

  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  return (
    <div className="select-none">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-[#8E9196]"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day, dayIndex) => {
              if (!day) {
                return (
                  <div
                    key={`empty-${weekIndex}-${dayIndex}`}
                    className="h-10 text-center text-[#C8C8C9] p-2"
                  />
                );
              }

              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrentDay = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => onDateSelect(day)}
                  className={cn(
                    "h-10 w-10 rounded-full text-center mx-auto",
                    "hover:bg-[#D6BCFA] hover:text-[#222222]",
                    "focus:outline-none",
                    isSelected && "bg-[#9b87f5] text-white hover:bg-[#9b87f5] hover:text-white",
                    isCurrentDay && !isSelected && "text-[#9b87f5] font-medium",
                    !isSelected && !isCurrentDay && "text-[#222222]"
                  )}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
