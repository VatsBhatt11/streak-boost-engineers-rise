
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import "./PostSubmission.css";

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
    <Card className="post-submission-card">
      <CardHeader>
        <CardTitle>Submit Today's Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="post-submission-form">
          <div className="post-submission-input-group">
            <label htmlFor="post-url" className="post-submission-label">Post URL</label>
            <Input
              id="post-url"
              placeholder="https://twitter.com/... or https://linkedin.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="post-submission-input"
            />
          </div>
          <Button
            type="submit"
            className="post-submission-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Post"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="post-submission-footer">
        <h4 className="post-submission-recent-title">Recent Submissions</h4>
        {recentSubmissions.length > 0 ? (
          <ul className="post-submission-list">
            {recentSubmissions.map((submission) => (
              <li key={submission.id} className="post-submission-item">
                <div className="post-submission-item-content">
                  <Badge variant={submission.platform === "twitter" ? "default" : "secondary"}>
                    {submission.platform === "twitter" ? "Twitter" : "LinkedIn"}
                  </Badge>
                  <a 
                    href={submission.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="post-submission-link"
                  >
                    {submission.url}
                  </a>
                </div>
                <span className="post-submission-date">{submission.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="post-submission-empty">No recent submissions</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostSubmission;
