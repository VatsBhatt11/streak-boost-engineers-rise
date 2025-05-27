
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
  isWithinInterval,
  parse,
  getWeeksInMonth,
  startOfWeek,
  endOfWeek
} from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "./StreakCalendar.css";

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

  // Generate array of months for the 6-month view
  const months = Array.from({ length: 6 }, (_, i) => {
    const month = addMonths(startDate, i);
    return {
      date: month,
      name: format(month, 'MMM')
    };
  });

  // Day of week headers - these will be displayed once for all months
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Render the calendar grid
  const renderCalendar = () => {
    return (
      <div className="streak-calendar-container">
        <div className="streak-calendar-wrapper">
          {/* Column labels (days of the week) */}
          <div className="streak-calendar-labels">
            <div className="streak-calendar-spacer"></div>
            {weekdays.map((day) => (
              <div key={day} className="streak-calendar-weekday">
                <span>{day}</span>
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="streak-calendar-content">
            {months.map((month) => {
              // Get all days in this month
              const monthStart = startOfMonth(month.date);
              const monthEnd = endOfMonth(month.date);
              
              // Get the start of the week containing the first day of the month
              const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Week starts on Monday (1)
              
              // Create a 7×7 grid (7 days × 7 weeks) - this is more than enough for any month
              // We'll only show the days that belong to the current month
              const days = [];
              for (let i = 0; i < 7; i++) { // 7 rows, one for each day of the week
                days.push(Array(7).fill(null)); // 7 columns, one for each week
              }
              
              // Fill the grid with actual days
              let currentDay = calendarStart;
              for (let week = 0; week < 7; week++) {
                for (let day = 0; day < 7; day++) {
                  // Place each day in the correct position in the grid
                  // We're using a week-based view where each row represents a specific day of the week
                  // and each column represents a specific week
                  const dayOfWeek = (getDay(currentDay) + 6) % 7; // Convert Sunday=0 to Monday=0
                  days[dayOfWeek][week] = currentDay;
                  
                  // Move to the next day
                  currentDay = new Date(currentDay);
                  currentDay.setDate(currentDay.getDate() + 1);
                }
              }
              
              return (
                <div key={month.name} className="streak-calendar-month">
                  {/* Month name */}
                  <div className="streak-calendar-month-header">
                    <span>{month.name}</span>
                  </div>
                  
                  {/* Days grid */}
                  <div>
                    {/* Render each row (day of week) */}
                    {weekdays.map((_, dayIndex) => (
                      <div key={`row-${month.name}-${dayIndex}`} className="streak-calendar-row">
                        {/* Render each column (week) */}
                        {Array(7).fill(0).map((_, weekIndex) => {
                          const day = days[dayIndex][weekIndex];
                          
                          // If this day exists and is within the current month
                          if (day && day.getMonth() === month.date.getMonth()) {
                            const activityLevel = getActivityLevel(day);
                            const postText = activityLevel === 0 ? 'No posts' : 
                                             activityLevel === 1 ? '1 post' : 
                                             `${activityLevel} posts`;
                                             
                            return (
                              <TooltipProvider key={`day-${month.name}-${dayIndex}-${weekIndex}`}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div 
                                      className={`streak-day streak-day-${activityLevel}`}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{format(day, 'MMM d')}: {postText}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            );
                          }
                          // Empty cell
                          return <div key={`empty-${month.name}-${dayIndex}-${weekIndex}`} className="streak-day-empty" />;
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="streak-calendar-legend">
          <span>Learn how we count contributions</span>
          <div className="streak-calendar-legend-items">
            <span>Less</span>
            <div className="streak-legend-box streak-legend-0"></div>
            <div className="streak-legend-box streak-legend-1"></div>
            <div className="streak-legend-box streak-legend-2"></div>
            <div className="streak-legend-box streak-legend-3"></div>
            <span>More</span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <Card className="streak-calendar-card">
      <CardHeader className="streak-calendar-header">
        <CardTitle className="streak-calendar-title">
          <span>Your Posting Streak</span>
          <div className="streak-stats">
            <div className="streak-stat">
              <span className="streak-stat-label">Current</span>
              <span className="streak-stat-value">{currentStreak} days</span>
            </div>
            <div className="streak-stat">
              <span className="streak-stat-label">Longest</span>
              <span className="streak-stat-value">{longestStreak} days</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="streak-calendar-controls">
          <div className="streak-calendar-navigation">
            <Button
              variant="outline"
              size="icon"
              className="streak-nav-button"
              onClick={goToPreviousMonth}
            >
              <ChevronLeft className="streak-nav-icon" />
            </Button>
            
            <span className="streak-date-range">
              {format(startDate, 'MMM yyyy')} - {format(endDate, 'MMM yyyy')}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              className="streak-nav-button"
              onClick={goToNextMonth}
            >
              <ChevronRight className="streak-nav-icon" />
            </Button>
          </div>
        </div>
        
        {renderCalendar()}
      </CardContent>
    </Card>
  );
};

export default StreakCalendar;
