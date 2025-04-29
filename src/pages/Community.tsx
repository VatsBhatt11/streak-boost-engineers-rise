
import AppLayout from "@/components/layout/AppLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, MessageSquare, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CommunityPost = ({ 
  username, 
  time, 
  content, 
  likes, 
  comments, 
  avatarSrc 
}: { 
  username: string; 
  time: string; 
  content: string; 
  likes: number; 
  comments: number;
  avatarSrc?: string;
}) => {
  return (
    <div className="border border-border rounded-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{username}</div>
          <div className="text-xs text-muted-foreground">{time}</div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm">{content}</p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex space-x-3 text-sm">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            👍 {likes}
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MessageSquare className="mr-1 h-4 w-4" /> {comments}
          </Button>
        </div>
        <Button variant="outline" size="sm">Share</Button>
      </div>
    </div>
  );
};

const Community = () => {
  const communityPosts = [
    {
      id: 1,
      username: "alex_developer",
      time: "2 hours ago",
      content: "Just completed my Day 15 challenge for #0to100xEngineer! Built a simple AI chatbot that can summarize articles. Check it out on my profile.",
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      username: "sara_coder",
      time: "Yesterday",
      content: "Struggling with prompt engineering for my RAG application. Any tips from the community? #0to100xEngineer Day 23 is kicking my butt!",
      likes: 18,
      comments: 12
    },
    {
      id: 3,
      username: "tech_marco",
      time: "2 days ago",
      content: "🎉 Just hit a 30-day streak on my #0to100xEngineer journey! The key is consistency and building in public. Happy to help anyone who's just getting started!",
      likes: 45,
      comments: 8
    }
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
            <BreadcrumbLink>Community</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Community</h1>
        <p className="text-muted-foreground">
          Connect with other engineers on their #0to100xEngineer journey
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="p-4 bg-secondary/30 rounded-lg mb-6">
            <textarea 
              placeholder="Share your progress with the community..." 
              className="w-full p-3 bg-secondary rounded-lg text-sm mb-3" 
              rows={3}
            />
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">Add #0to100xEngineer to your post</div>
              <Button className="bg-brand-orange hover:bg-brand-orange/90">Post Update</Button>
            </div>
          </div>
          
          {communityPosts.map(post => (
            <CommunityPost 
              key={post.id}
              username={post.username}
              time={post.time}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </div>
        
        <div>
          <div className="border border-border rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-3">Top Contributors</h3>
            <div className="space-y-3">
              {['alex_developer', 'sara_coder', 'tech_marco', 'jenny_ai'].map((user, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>{user[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user}</span>
                  </div>
                  <Badge variant="outline" className="bg-secondary/50">
                    {30 - i * 5}d streak
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3">
              View All
            </Button>
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-medium mb-3">Popular Topics</h3>
            <div className="flex flex-wrap gap-2">
              {['AI Projects', 'Prompt Engineering', 'RAG Systems', 'GenAI Basics', 'Midjourney', 'ChatGPT', 'LLMs'].map((topic, i) => (
                <Badge key={i} variant="secondary" className="cursor-pointer">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Community;
