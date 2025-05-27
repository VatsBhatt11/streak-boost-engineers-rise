
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

const PostSubmission = () => {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentSubmissions, setRecentSubmissions] = useState([
    {
      id: "post1",
      url: "https://twitter.com/user/status/123456789",
      platform: "twitter",
      date: "2025-04-28"
    },
    {
      id: "post2",
      url: "https://linkedin.com/posts/user_0to100xengineer-activity-123456789",
      platform: "linkedin",
      date: "2025-04-27"
    }
  ]);

  const detectPlatform = (url: string) => {
    if (url.includes("twitter.com") || url.includes("x.com")) {
      return "twitter";
    } else if (url.includes("linkedin.com")) {
      return "linkedin";
    }
    return "unknown";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Missing URL",
        description: "Please enter a valid LinkedIn or Twitter post URL",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const platform = detectPlatform(url);
      const newSubmission = {
        id: `post${Date.now()}`,
        url: url,
        platform: platform,
        date: new Date().toISOString().split("T")[0]
      };
      
      setRecentSubmissions(prev => [newSubmission, ...prev]);
      setUrl("");
      setIsSubmitting(false);
      
      toast({
        title: "Post submitted successfully!",
        description: "Your streak has been updated.",
      });
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Submit Today's Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="post-url" className="text-sm font-medium">Post URL</label>
            <Input
              id="post-url"
              placeholder="https://twitter.com/... or https://linkedin.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-secondary"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-brand-orange hover:bg-brand-orange/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Post"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col items-start border-t border-border pt-4">
        <h4 className="text-sm font-medium mb-2">Recent Submissions</h4>
        {recentSubmissions.length > 0 ? (
          <ul className="w-full space-y-2">
            {recentSubmissions.map((submission) => (
              <li key={submission.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 truncate max-w-[70%]">
                  <Badge variant={submission.platform === "twitter" ? "default" : "secondary"}>
                    {submission.platform === "twitter" ? "Twitter" : "LinkedIn"}
                  </Badge>
                  <a 
                    href={submission.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="truncate hover:text-brand-orange"
                  >
                    {submission.url}
                  </a>
                </div>
                <span className="text-muted-foreground">{submission.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">No recent submissions</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostSubmission;
