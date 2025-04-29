
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Trophy, 
  Star, 
  Calendar, 
  Award, 
  Flag
} from 'lucide-react';

const MainNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: Calendar },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'My Achievements', path: '/achievements', icon: Award },
    { name: 'Community', path: '/community', icon: Flag },
    { name: 'Profile', path: '/profile', icon: Star },
  ];
  
  return (
    <div className="fixed left-0 h-screen w-16 lg:w-64 bg-sidebar flex flex-col transition-all duration-300 border-r border-sidebar-border">
      <div className="py-8 flex justify-center lg:justify-start lg:px-6 items-center">
        <div className="h-10 w-10 rounded bg-brand-orange flex items-center justify-center text-white font-bold">
          100x
        </div>
        <h1 className="hidden lg:block text-xl font-bold text-white ml-2">
          Track<span className="text-brand-orange">100x</span>
        </h1>
      </div>
      
      <nav className="flex-1 pt-8">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path}
                className={cn(
                  "flex items-center py-3 px-3 rounded-md transition-all hover:bg-sidebar-accent",
                  location.pathname === item.path ? "bg-sidebar-accent text-brand-orange" : "text-sidebar-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="hidden lg:block ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 hidden lg:block">
        <div className="px-3 py-2 text-xs text-sidebar-foreground">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-brand-orange mr-2"></div>
            <span>100xEngineers Cohort</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
