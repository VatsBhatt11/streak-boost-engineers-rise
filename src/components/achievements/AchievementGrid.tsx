
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Trophy, Award, Star, Calendar, Flag, Heart } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  progress?: number;
  color: string;
}

const achievements: Achievement[] = [
  {
    id: "a1",
    name: "First Post",
    description: "Submit your first post to begin your journey.",
    icon: Flag,
    unlocked: true,
    color: "text-green-500"
  },
  {
    id: "a2",
    name: "Streak Starter",
    description: "Maintain a 3-day posting streak.",
    icon: Calendar,
    unlocked: true,
    color: "text-blue-500"
  },
  {
    id: "a3",
    name: "Week Warrior",
    description: "Maintain a 7-day posting streak.",
    icon: Star,
    unlocked: true,
    color: "text-yellow-500"
  },
  {
    id: "a4",
    name: "Consistent Creator",
    description: "Maintain a 14-day posting streak.",
    icon: Award,
    unlocked: false,
    progress: 65,
    color: "text-purple-500"
  },
  {
    id: "a5",
    name: "Content Master",
    description: "Maintain a 30-day posting streak.",
    icon: Trophy,
    unlocked: false,
    progress: 30,
    color: "text-orange-500"
  },
  {
    id: "a6",
    name: "Community Favorite",
    description: "Have one of your posts featured by moderators.",
    icon: Heart,
    unlocked: false,
    color: "text-red-500"
  }
];

const AchievementGrid = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={cn(
                "border rounded-lg p-4 flex flex-col items-center text-center transition-all",
                achievement.unlocked 
                  ? "border-brand-orange bg-secondary/50" 
                  : "border-border bg-secondary/10 opacity-60"
              )}
            >
              <div className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center mb-3",
                achievement.unlocked ? `${achievement.color} animate-pulse-opacity` : "text-muted-foreground"
              )}>
                <achievement.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold">{achievement.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{achievement.description}</p>
              
              {achievement.progress !== undefined && (
                <div className="w-full mt-3">
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-orange rounded-full"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.progress}% complete</p>
                </div>
              )}
              
              {achievement.unlocked && !achievement.progress && (
                <div className="mt-3 text-xs text-brand-orange font-medium">
                  ✓ Unlocked
                </div>
              )}
              
              {!achievement.unlocked && !achievement.progress && (
                <div className="mt-3 text-xs text-muted-foreground">
                  Locked
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementGrid;
