
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, Calendar, Flag } from "lucide-react";
import "./UserStatsCards.css";

const UserStatsCards = () => {
  // Mock data
  const stats = {
    currentStreak: 7,
    longestStreak: 14,
    totalPosts: 21,
    rank: 8
  };
  
  return (
    <div className="user-stats-grid">
      <Card className="user-stats-card">
        <CardContent className="user-stats-card-content">
          <div className="user-stats-item">
            <div className="user-stats-icon-container">
              <Calendar className="user-stats-icon" />
            </div>
            <div>
              <p className="user-stats-label">Current Streak</p>
              <h3 className="user-stats-value">
                {stats.currentStreak}
                <span className="user-stats-unit">days</span>
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="user-stats-card">
        <CardContent className="user-stats-card-content">
          <div className="user-stats-item">
            <div className="user-stats-icon-container">
              <Star className="user-stats-icon" />
            </div>
            <div>
              <p className="user-stats-label">Longest Streak</p>
              <h3 className="user-stats-value">
                {stats.longestStreak}
                <span className="user-stats-unit">days</span>
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="user-stats-card">
        <CardContent className="user-stats-card-content">
          <div className="user-stats-item">
            <div className="user-stats-icon-container">
              <Flag className="user-stats-icon" />
            </div>
            <div>
              <p className="user-stats-label">Total Posts</p>
              <h3 className="user-stats-value">{stats.totalPosts}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="user-stats-card">
        <CardContent className="user-stats-card-content">
          <div className="user-stats-item">
            <div className="user-stats-icon-container">
              <Trophy className="user-stats-icon" />
            </div>
            <div>
              <p className="user-stats-label">Current Rank</p>
              <h3 className="user-stats-value">#{stats.rank}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatsCards;
