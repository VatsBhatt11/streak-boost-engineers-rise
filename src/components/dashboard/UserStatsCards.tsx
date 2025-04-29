
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, Calendar, Flag } from "lucide-react";

const UserStatsCards = () => {
  // Mock data
  const stats = {
    currentStreak: 7,
    longestStreak: 14,
    totalPosts: 21,
    rank: 8
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-secondary to-card border-secondary/50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-secondary/80 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-brand-orange" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Current Streak</p>
              <h3 className="text-2xl font-bold flex items-baseline gap-1">
                {stats.currentStreak}
                <span className="text-sm font-normal text-muted-foreground">days</span>
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-secondary to-card border-secondary/50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-secondary/80 flex items-center justify-center">
              <Star className="h-6 w-6 text-brand-orange" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Longest Streak</p>
              <h3 className="text-2xl font-bold flex items-baseline gap-1">
                {stats.longestStreak}
                <span className="text-sm font-normal text-muted-foreground">days</span>
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-secondary to-card border-secondary/50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-secondary/80 flex items-center justify-center">
              <Flag className="h-6 w-6 text-brand-orange" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Posts</p>
              <h3 className="text-2xl font-bold">{stats.totalPosts}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-secondary to-card border-secondary/50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-secondary/80 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-brand-orange" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Current Rank</p>
              <h3 className="text-2xl font-bold">#{stats.rank}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatsCards;
