
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Award, Star } from "lucide-react";

// Generate mock leaderboard data
const generateMockLeaderboard = () => {
  const users = [
    { id: "user1", name: "Alex Morgan", avatar: "AM" },
    { id: "user2", name: "Jamie Smith", avatar: "JS" },
    { id: "user3", name: "Taylor Johnson", avatar: "TJ" },
    { id: "user4", name: "Jordan Davis", avatar: "JD" },
    { id: "user5", name: "Casey Williams", avatar: "CW" },
    { id: "user6", name: "Riley Brown", avatar: "RB" },
    { id: "user7", name: "Quinn Miller", avatar: "QM" },
    { id: "user8", name: "Morgan Lee", avatar: "ML" },
    { id: "user9", name: "Avery Wilson", avatar: "AW" },
    { id: "user10", name: "Cameron Thomas", avatar: "CT" },
  ];
  
  return users.map((user, index) => {
    // Create realistic streak and post numbers based on position
    const streak = Math.max(1, 30 - index * 2 - Math.floor(Math.random() * 3));
    const totalPosts = streak + Math.floor(Math.random() * 10);
    
    // Determine badge based on streak length
    let badge = null;
    if (streak >= 20) badge = "diamond";
    else if (streak >= 15) badge = "platinum";
    else if (streak >= 10) badge = "gold";
    else if (streak >= 5) badge = "silver";
    
    return {
      ...user,
      rank: index + 1,
      currentStreak: streak,
      totalPosts,
      badge
    };
  });
};

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  currentStreak: number;
  totalPosts: number;
  badge: string | null;
}

const LeaderboardTable = () => {
  const [leaderboardData] = useState<LeaderboardEntry[]>(generateMockLeaderboard());
  const [sortBy, setSortBy] = useState<"rank" | "currentStreak" | "totalPosts">("rank");
  
  const getBadgeIcon = (badge: string | null) => {
    if (!badge) return null;
    
    switch (badge) {
      case "diamond":
        return <Trophy className="h-4 w-4 text-blue-400" />;
      case "platinum":
        return <Trophy className="h-4 w-4 text-purple-400" />;
      case "gold":
        return <Award className="h-4 w-4 text-yellow-400" />;
      case "silver":
        return <Star className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };
  
  const getBadgeColor = (badge: string | null) => {
    if (!badge) return "";
    
    switch (badge) {
      case "diamond":
        return "bg-blue-900/30 text-blue-400 border-blue-700";
      case "platinum":
        return "bg-purple-900/30 text-purple-400 border-purple-700";
      case "gold":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700";
      case "silver":
        return "bg-gray-900/30 text-gray-400 border-gray-700";
      default:
        return "";
    }
  };
  
  const sortedData = [...leaderboardData].sort((a, b) => {
    if (sortBy === "rank") return a.rank - b.rank;
    if (sortBy === "currentStreak") return b.currentStreak - a.currentStreak;
    return b.totalPosts - a.totalPosts;
  });
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Leaderboard</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSortBy("rank")}
              className={sortBy === "rank" ? "bg-secondary" : ""}
            >
              Rank
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSortBy("currentStreak")}
              className={sortBy === "currentStreak" ? "bg-secondary" : ""}
            >
              Streaks
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSortBy("totalPosts")}
              className={sortBy === "totalPosts" ? "bg-secondary" : ""}
            >
              Posts
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-muted-foreground text-sm border-b border-border">
                <th className="px-4 py-3 text-left font-medium w-16">Rank</th>
                <th className="px-4 py-3 text-left font-medium">User</th>
                <th className="px-4 py-3 text-center font-medium">Current Streak</th>
                <th className="px-4 py-3 text-center font-medium">Total Posts</th>
                <th className="px-4 py-3 text-center font-medium">Badge</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((entry) => (
                <tr 
                  key={entry.id} 
                  className="border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors"
                >
                  <td className="px-4 py-3 text-center">
                    <span className={
                      entry.rank <= 3 
                        ? "inline-flex items-center justify-center h-6 w-6 rounded-full bg-brand-orange text-white font-bold" 
                        : ""
                    }>
                      {entry.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm">
                        {entry.avatar}
                      </div>
                      <span>{entry.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono">{entry.currentStreak} days</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono">{entry.totalPosts}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {entry.badge ? (
                      <Badge 
                        variant="outline" 
                        className={`inline-flex gap-1 ${getBadgeColor(entry.badge)}`}
                      >
                        {getBadgeIcon(entry.badge)}
                        <span className="capitalize">{entry.badge}</span>
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardTable;
