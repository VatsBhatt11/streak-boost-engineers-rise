
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import StreakCalendar from "@/components/dashboard/StreakCalendar";
import PostSubmission from "@/components/dashboard/PostSubmission";
import UserStatsCards from "@/components/dashboard/UserStatsCards";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import LoginForm from "@/components/auth/LoginForm";
import { useEffect, useState } from "react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-10 w-10 rounded bg-brand-orange flex items-center justify-center text-white font-bold">
              100x
            </div>
            <h1 className="text-2xl font-bold">
              Track<span className="brand-orange">100x</span>
            </h1>
          </div>
          <h2 className="text-3xl font-bold mb-2">Track Your #0to100xEngineer Challenge</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Build your streak, climb the leaderboard, and earn achievements by posting daily about your GenAI journey.
          </p>
        </div>
        
        <LoginForm />
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Need an account? Contact your cohort admin.</p>
        </div>
      </div>
    );
  }
  
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Track your progress in the #0to100xEngineer challenge</p>
        </div>
        <Button style={{ backgroundColor: '#f97316' }} className="hover:bg-brand-orange/90">
          Post Today
        </Button>
      </div>
      
      <div className="space-y-6">
        <UserStatsCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StreakCalendar />
          <PostSubmission />
        </div>
        
        <div style={{ paddingTop: '1rem' }}>
          <LeaderboardTable />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
