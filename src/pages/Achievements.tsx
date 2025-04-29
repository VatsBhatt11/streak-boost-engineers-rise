
import AppLayout from "@/components/layout/AppLayout";
import AchievementGrid from "@/components/achievements/AchievementGrid";

const Achievements = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Achievements</h1>
        <p className="text-muted-foreground">
          Track your milestones and unlock achievements through consistent posting
        </p>
      </div>
      
      <AchievementGrid />
    </AppLayout>
  );
};

export default Achievements;
