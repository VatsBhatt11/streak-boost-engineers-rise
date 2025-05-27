
import AppLayout from "@/components/layout/AppLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">
                <Home className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-brand-orange">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="mt-2">{user.bio}</p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <div>
                <span className="text-lg font-bold">{user.currentStreak}</span>
                <span className="text-muted-foreground ml-1 text-sm">day streak</span>
              </div>
              <div>
                <span className="text-lg font-bold">{user.longestStreak}</span>
                <span className="text-muted-foreground ml-1 text-sm">longest</span>
              </div>
              <div>
                <span className="text-lg font-bold">{user.totalPosts}</span>
                <span className="text-muted-foreground ml-1 text-sm">total posts</span>
              </div>
            </div>
          </div>
          
          <Button>Edit Profile</Button>
        </div>
      </div>
      
      <Tabs defaultValue="posts" className="mt-6">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts">
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between mb-3">
                  <Badge variant="outline">{post.platform}</Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <p className="text-sm mb-3">{post.content}</p>
                <div className="text-xs text-muted-foreground">
                  {post.likes} likes
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg ${achievement.achieved ? 'border-brand-orange bg-secondary/30' : 'border-border opacity-60'}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{achievement.name}</h3>
                  {achievement.achieved ? (
                    <Badge className="bg-brand-orange">Unlocked</Badge>
                  ) : (
                    <Badge variant="outline">Locked</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="max-w-md mx-auto border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Display Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 bg-secondary rounded-md" 
                  defaultValue={user.name}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Username</label>
                <input 
                  type="text" 
                  className="w-full p-2 bg-secondary rounded-md" 
                  defaultValue={user.username}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Bio</label>
                <textarea 
                  className="w-full p-2 bg-secondary rounded-md" 
                  rows={3}
                  defaultValue={user.bio}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email Notifications</label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notifications" defaultChecked />
                  <label htmlFor="notifications">Receive daily streak reminders</label>
                </div>
              </div>
              <Button className="w-full mt-2">Save Changes</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Profile;
