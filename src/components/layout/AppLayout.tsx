
import { ReactNode } from "react";
import MainNavigation from "@/components/MainNavigation";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  const progressValue = 65; // This would come from user data in a real app
  
  return (
    <div className="min-h-screen flex">
      <MainNavigation />
      <div className="flex-1 ml-16 lg:ml-64 p-6">
        <main className="max-w-7xl mx-auto">
          {isHomePage && (
            <div className="mb-6 pb-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <span className="text-sm font-medium">{progressValue}%</span>
              </div>
              <Progress value={progressValue} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Complete your first 30-day streak to reach platform mastery</p>
            </div>
          )}
          {children}
        </main>
        <footer className="mt-8 text-center text-muted-foreground text-sm py-4">
          © {new Date().getFullYear()} Track100xEngineers | Powered by 100xEngineers
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
