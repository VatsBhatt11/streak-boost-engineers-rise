
import AppLayout from "@/components/layout/AppLayout";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";

const Leaderboard = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">
          See how you rank against other #0to100xEngineer participants
        </p>
      </div>
      
      <LeaderboardTable />
    </AppLayout>
  );
};

export default Leaderboard;
