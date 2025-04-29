
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data for the streak calendar
const generateMockData = () => {
  const days = 28; // 4 weeks
  const result = [];
  
  for (let i = 0; i < days; i++) {
    // Random level between 0-3, with higher probability for consistent streaks
    let level;
    const random = Math.random();
    
    if (i > 0 && result[i-1] > 0 && random > 0.2) {
      // 80% chance to continue a streak
      level = Math.min(result[i-1] + (random > 0.5 ? 1 : 0), 3);
    } else {
      level = random > 0.6 ? Math.floor(random * 4) : 0;
    }
    
    result.push(level);
  }
  
  return result;
};

const StreakCalendar = () => {
  const [streakData] = useState(generateMockData());
  const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
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
        <div className="flex text-xs text-muted-foreground mb-2">
          {weekLabels.map((day) => (
            <div key={day} className="flex-1 text-center">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {streakData.map((level, i) => (
            <div 
              key={i} 
              className={cn(
                "streak-day",
                `streak-day-${level}`
              )}
              data-tooltip-id="day-tooltip"
              data-tooltip-content={`Day ${i+1}: ${level > 0 ? 'Posted' : 'No post'}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCalendar;
