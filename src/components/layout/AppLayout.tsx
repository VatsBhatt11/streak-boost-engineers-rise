
import { ReactNode } from "react";
import MainNavigation from "@/components/MainNavigation";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <MainNavigation />
      <div className="flex-1 ml-16 lg:ml-64 p-6">
        <main className="max-w-7xl mx-auto">
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
