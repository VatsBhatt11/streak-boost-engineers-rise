
import AppLayout from "@/components/layout/AppLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./Profile.css";

const Profile = () => {
  // This would come from user data in a real app
  const user = {
    name: "Alex Developer",
    username: "alex_developer",
    bio: "Software engineer focused on GenAI applications. Currently building with Mistral and learning RAG techniques. #0to100xEngineer",
    currentStreak: 15,
    longestStreak: 21,
    totalPosts: 32,
    avatar: "" // Empty for now, will use fallback
  };

  const recentPosts = [
    {
      id: 1,
      content: "Day 32: Built a custom RAG system using Mistral's API to answer complex questions about my codebase! #0to100xEngineer",
      platform: "Twitter",
      date: "2 days ago",
      likes: 15
    },
    {
      id: 2,
      content: "I've been consistently applying the RAG techniques we learned in week 4, and the results are impressive. My GenAI app now handles complex queries with much better context. #0to100xEngineer Day 31",
      platform: "LinkedIn",
      date: "3 days ago",
      likes: 42
    },
    {
      id: 3,
      content: "Implementing a vector database for the first time today. Exciting to see how much faster the retrieval gets! #0to100xEngineer Day 30",
      platform: "Twitter",
      date: "4 days ago",
      likes: 19
    }
  ];

  const achievements = [
    { name: "Streak Starter", description: "Maintain a 3-day streak", achieved: true },
    { name: "Week Warrior", description: "Maintain a 7-day streak", achieved: true },
    { name: "Consistent Creator", description: "Maintain a 14-day streak", achieved: true },
    { name: "Master Engineer", description: "Maintain a 30-day streak", achieved: false }
  ];

  return (
    <AppLayout>
      <Breadcrumb className="profile-breadcrumb">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">
                <Home className="profile-breadcrumb-home-icon" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="profile-header">
        <div className="profile-header-content">
          <Avatar className="profile-avatar">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="profile-avatar-fallback">{user.name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="profile-info">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-username">@{user.username}</p>
            <p className="profile-bio">{user.bio}</p>
            
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="profile-stat-value">{user.currentStreak}</span>
                <span className="profile-stat-label">day streak</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-value">{user.longestStreak}</span>
                <span className="profile-stat-label">longest</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-value">{user.totalPosts}</span>
                <span className="profile-stat-label">total posts</span>
              </div>
            </div>
          </div>
          
          <Button>Edit Profile</Button>
        </div>
      </div>
      
      <Tabs defaultValue="posts" className="profile-tabs">
        <TabsList className="profile-tabs-list">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts">
          <div className="profile-posts">
            {recentPosts.map((post) => (
              <div key={post.id} className="profile-post-card">
                <div className="profile-post-header">
                  <Badge variant="outline">{post.platform}</Badge>
                  <span className="profile-post-date">{post.date}</span>
                </div>
                <p className="profile-post-content">{post.content}</p>
                <div className="profile-post-likes">
                  {post.likes} likes
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="achievements">
          <div className="profile-achievements">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`profile-achievement-card ${achievement.achieved ? 'achieved' : 'locked'}`}
              >
                <div className="profile-achievement-header">
                  <h3 className="profile-achievement-name">{achievement.name}</h3>
                  {achievement.achieved ? (
                    <Badge className="profile-achievement-badge-unlocked">Unlocked</Badge>
                  ) : (
                    <Badge variant="outline">Locked</Badge>
                  )}
                </div>
                <p className="profile-achievement-description">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="profile-settings">
            <h2 className="profile-settings-title">Account Settings</h2>
            <div className="profile-settings-form">
              <div className="profile-settings-field">
                <label className="profile-settings-label">Display Name</label>
                <input 
                  type="text" 
                  className="profile-settings-input" 
                  defaultValue={user.name}
                />
              </div>
              <div className="profile-settings-field">
                <label className="profile-settings-label">Username</label>
                <input 
                  type="text" 
                  className="profile-settings-input" 
                  defaultValue={user.username}
                />
              </div>
              <div className="profile-settings-field">
                <label className="profile-settings-label">Bio</label>
                <textarea 
                  className="profile-settings-textarea" 
                  rows={3}
                  defaultValue={user.bio}
                />
              </div>
              <div className="profile-settings-field">
                <label className="profile-settings-label">Email Notifications</label>
                <div className="profile-settings-checkbox">
                  <input type="checkbox" id="notifications" defaultChecked />
                  <label htmlFor="notifications">Receive daily streak reminders</label>
                </div>
              </div>
              <Button className="profile-settings-button">Save Changes</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Profile;
