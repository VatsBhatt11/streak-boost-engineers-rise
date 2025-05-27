
import { ReactNode } from "react";
import MainNavigation from "@/components/MainNavigation";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "react-router-dom";
import "./AppLayout.css";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  const progressValue = 65; // This would come from user data in a real app
  
  return (
    <div className="app-layout">
      <MainNavigation />
      <div className="app-layout-content">
        <main className="app-layout-main">
          {isHomePage && (
            <div className="app-layout-progress">
              <div className="app-layout-progress-header">
                <p className="app-layout-progress-label">Overall Progress</p>
                <span className="app-layout-progress-value">{progressValue}%</span>
              </div>
              <Progress value={progressValue} className="app-layout-progress-bar" />
              <p className="app-layout-progress-description">Complete your first 30-day streak to reach platform mastery</p>
            </div>
          )}
          {children}
        </main>
        <footer className="app-layout-footer">
          © {new Date().getFullYear()} Track100xEngineers | Powered by 100xEngineers
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
