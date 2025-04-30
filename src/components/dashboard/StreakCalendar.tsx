
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  format, 
  eachDayOfInterval, 
  startOfMonth, 
  endOfMonth, 
  getDay, 
  addMonths, 
  subMonths, 
  startOfWeek,
  endOfWeek,
  isSameMonth,
  parse,
  isSameDay
} from "date-fns";

// Mock data generator that creates data for a given date range
const generateMockDataForDateRange = (startDate: Date, endDate: Date) => {
  const days = eachDayOfInterval({
    start: startDate,
    end: endDate
  });
  
  // Create a map of dates to activity levels
  const activityMap = new Map();
  
  days.forEach(day => {
    const random = Math.random();
    // Generate random activity level (0-3)
    // 0 = no posts, 1-3 = increasing number of posts
    let activityLevel = 0;
    if (random < 0.6) activityLevel = 0;
    else if (random < 0.8) activityLevel = 1;
    else if (random < 0.95) activityLevel = 2;
    else activityLevel = 3;
    
    const dateKey = format(day, 'yyyy-MM-dd');
    activityMap.set(dateKey, activityLevel);
  });
  
  return activityMap;
};

const StreakCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [streakData, setStreakData] = useState<Map<string, number>>(new Map());
  
  // Calculate start and end dates for the 6-month view
  const startDate = startOfMonth(subMonths(currentDate, 5)); // 5 months before current month
  const endDate = endOfMonth(currentDate); // Current month
  
  // Generate data when date range changes
  useEffect(() => {
    setStreakData(generateMockDataForDateRange(startDate, endDate));
  }, [currentDate]);
  
  // Get days of week for labels
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Get all months in the current range
  const getMonthsInRange = () => {
    const months = [];
    let current = startDate;
    
    while (current <= endDate) {
      months.push(format(current, 'MMM'));
      current = addMonths(current, 1);
    }
    
    return months;
  };
  
  const months = getMonthsInRange();
  
  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };
  
  // Get activity level for a specific date
  const getActivityLevel = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return streakData.get(dateKey) || 0;
  };
  
  // Calculate current streak
  const getCurrentStreak = () => {
    const today = new Date();
    let count = 0;
    let currentDate = today;
    
    while (true) {
      const dateKey = format(currentDate, 'yyyy-MM-dd');
      const activityLevel = streakData.get(dateKey);
      
      if (activityLevel && activityLevel > 0) {
        count++;
        currentDate = subMonths(currentDate, 1);
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
    
    const sortedDates = Array.from(streakData.keys()).sort();
    
    for (const dateKey of sortedDates) {
      const activityLevel = streakData.get(dateKey) || 0;
      
      if (activityLevel > 0) {
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
  
  // Create the calendar grid layout for the 6-month view
  const renderCalendarGrid = () => {
    // Create a grid with days of the week as rows and dates as columns
    return (
      <div className="flex flex-col">
        {/* Month headers */}
        <div className="flex mb-1">
          <div className="w-10" /> {/* Empty cell for day of week labels */}
          {months.map(month => (
            <div 
              key={month} 
              className="flex-1 text-sm text-center text-muted-foreground"
            >
              {month}
            </div>
          ))}
        </div>
        
        {/* Days of the week and contribution cells */}
        {weekDays.map((day, dayIndex) => (
          <div key={day} className="flex items-center mb-1">
            <div className="w-10 text-xs text-right pr-2 text-muted-foreground">
              {day}
            </div>
            
            {/* Generate cells for each week day across all months */}
            <div className="flex-1 grid grid-cols-6 gap-1">
              {Array.from({ length: 6 }).map((_, monthIndex) => {
                const monthDate = addMonths(startDate, monthIndex);
                const monthStartDate = startOfMonth(monthDate);
                const monthEndDate = endOfMonth(monthDate);
                
                // Find the day in this month that corresponds to our current weekday
                // If we're looking at Monday (dayIndex 0), we want to find all Mondays in this month
                const daysOfWeek = [];
                let currentDay = startOfMonth(monthDate);
                
                // Adjust to find the first occurrence of our weekday
                while (getDay(currentDay) !== ((dayIndex + 1) % 7)) { // +1 because our weekDays starts with Monday (1) not Sunday (0)
                  currentDay = new Date(currentDay.setDate(currentDay.getDate() + 1));
                }
                
                // Now collect all occurrences of this weekday in the month
                while (currentDay <= monthEndDate) {
                  daysOfWeek.push(currentDay);
                  // Move to next week
                  currentDay = new Date(currentDay.setDate(currentDay.getDate() + 7));
                }
                
                // If there are no occurrences of this day in the month (rare edge case)
                // or if we need a placeholder, return an empty cell
                if (daysOfWeek.length === 0) {
                  return <div key={`empty-${monthIndex}`} className="h-4 w-4" />;
                }
                
                // We're interested in the middle occurrence (approximating the center of the month)
                const representativeDay = daysOfWeek[Math.min(2, daysOfWeek.length - 1)];
                const activityLevel = getActivityLevel(representativeDay);
                
                return (
                  <div 
                    key={`day-${monthIndex}-${dayIndex}`}
                    className={cn(
                      "h-4 w-4 rounded-sm",
                      activityLevel === 0 && "bg-secondary/40", // Dark but visible
                      activityLevel === 1 && "bg-brand-orange/60",
                      activityLevel === 2 && "bg-brand-orange/80",
                      activityLevel === 3 && "bg-brand-orange"
                    )}
                    title={`${format(representativeDay, 'MMM d')}: ${activityLevel > 0 ? `${activityLevel} post${activityLevel > 1 ? 's' : ''}` : 'No posts'}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
        
        {/* Legend */}
        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
          <span>Learn how we count contributions</span>
          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="h-3 w-3 rounded-sm bg-secondary/40"></div>
            <div className="h-3 w-3 rounded-sm bg-brand-orange/60"></div>
            <div className="h-3 w-3 rounded-sm bg-brand-orange/80"></div>
            <div className="h-3 w-3 rounded-sm bg-brand-orange"></div>
            <span>More</span>
          </div>
        </div>
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
            
            <span className="text-sm">
              {format(startDate, 'MMM yyyy')} - {format(endDate, 'MMM yyyy')}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={goToNextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {renderCalendarGrid()}
      </CardContent>
    </Card>
  );
};

export default StreakCalendar;
