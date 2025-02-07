import { useState } from 'react';
import { DatePicker } from '@/components/date-picker/DatePicker';
import { format } from 'date-fns';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">日期選擇器</h1>
          <p className="text-muted-foreground">
            選擇的日期: {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '未選擇'}
          </p>
        </div>

        <div className="flex justify-center">
          <DatePicker
            onSelect={(date) => setSelectedDate(date)}
            onClose={() => console.log('closed')}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;