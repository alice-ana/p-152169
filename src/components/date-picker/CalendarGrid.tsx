import React from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isToday, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  selectedDate,
  onDateSelect,
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Calculate padding days for the start of the month
  const startDay = monthStart.getDay();
  const prevMonthPadding = Array(startDay).fill(null);

  // Calculate padding days for the end of the month
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
            className="text-center text-sm font-medium text-muted-foreground py-2"
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
                    className="h-10 text-center text-muted-foreground p-2"
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
                    "h-10 w-full rounded-lg text-center",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    isCurrentDay && !isSelected && "border border-primary text-primary"
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