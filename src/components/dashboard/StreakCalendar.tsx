
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, eachDayOfInterval, startOfMonth, endOfMonth, getDay, addMonths, subMonths } from "date-fns";

// Mock data generator that creates data for a specific month
const generateMockDataForMonth = (year: number, month: number) => {
  const firstDay = startOfMonth(new Date(year, month));
  const lastDay = endOfMonth(new Date(year, month));
  
  const days = eachDayOfInterval({
    start: firstDay,
    end: lastDay
  });
  
  return days.map(day => {
    const random = Math.random();
    // Generate random activity level (0-3)
    // 0 = no posts, 1-3 = increasing number of posts
    if (random < 0.6) return 0;
    if (random < 0.8) return 1;
    if (random < 0.95) return 2;
    return 3;
  });
};

const StreakCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [streakData, setStreakData] = useState<number[]>([]);
  
  // Generate data when month changes
  useEffect(() => {
    setStreakData(generateMockDataForMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    ));
  }, [currentDate]);
  
  // Get days of week for labels (Sunday to Saturday)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Calculate current streak
  const getCurrentStreak = () => {
    let count = 0;
    for (let i = streakData.length - 1; i >= 0; i--) {
      if (streakData[i] > 0) {
        count++;
      } else {
        break;
      }
    }
    return count;
  };
  
  // Calculate longest streak
  const getLongestStreak = () => {
    let longest = 0;
    let current = 0;
    
    for (const day of streakData) {
      if (day > 0) {
        current++;
        longest = Math.max(longest, current);
      } else {
        current = 0;
      }
    }
    
    return longest;
  };
  
  const currentStreak = getCurrentStreak();
  const longestStreak = getLongestStreak();
  
  // Get all months for the dropdown
  const months = Array.from({ length: 12 }, (_, i) => {
    return {
      value: i.toString(),
      label: format(new Date(2000, i), 'MMMM')
    };
  });
  
  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };
  
  // Create the calendar grid layout
  const renderCalendarGrid = () => {
    const firstDayOfMonth = startOfMonth(currentDate);
    const startWeekday = getDay(firstDayOfMonth); // 0 = Sunday, 6 = Saturday
    const daysInMonth = streakData.length;
    
    // Create placeholder cells for days before the 1st of the month
    const placeholders = Array(startWeekday).fill(null);
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Day of week headers */}
        {weekDays.map(day => (
          <div key={day} className="text-xs text-center text-muted-foreground py-1">
            {day}
          </div>
        ))}
        
        {/* Empty cells before the 1st */}
        {placeholders.map((_, index) => (
          <div key={`placeholder-${index}`} className="h-5 w-5" />
        ))}
        
        {/* Actual day cells */}
        {streakData.map((level, i) => (
          <div 
            key={i} 
            className={cn(
              "h-5 w-5 rounded-sm",
              level === 0 && "bg-secondary/40",
              level === 1 && "bg-brand-orange/60",
              level === 2 && "bg-brand-orange/80",
              level === 3 && "bg-brand-orange"
            )}
            title={`${format(new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1), 'MMM d')}: ${level > 0 ? `${level} post${level > 1 ? 's' : ''}` : 'No posts'}`}
          />
        ))}
      </div>
    );
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Your Posting Streak</span>
          <div className="flex gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground">Current</span>
              <span className="text-xl font-bold">{currentStreak} days</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground">Longest</span>
              <span className="text-xl font-bold">{longestStreak} days</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={goToPreviousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Select
              value={currentDate.getMonth().toString()}
              onValueChange={(value) => {
                const newDate = new Date(currentDate);
                newDate.setMonth(parseInt(value));
                setCurrentDate(newDate);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue>
                  {format(currentDate, 'MMMM yyyy')}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={goToNextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-secondary/40 rounded-sm"></div>
              <span className="text-xs text-muted-foreground">No posts</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-brand-orange rounded-sm"></div>
              <span className="text-xs text-muted-foreground">Posted</span>
            </div>
          </div>
        </div>
        
        {renderCalendarGrid()}
      </CardContent>
    </Card>
  );
};

export default StreakCalendar;
